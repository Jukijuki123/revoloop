// ─────────────────────────────────────────────────────────────────────────────
// API: /api/admin/transaksi
// GET  — Ambil semua transaksi TrashCash dengan info user (khusus admin)
// PATCH — Konfirmasi transaksi: ubah status → selesai + kasih koin ke user
// DELETE — Logout admin
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, clearAdminCookie } from "@/lib/auth";

// Jenis transaksi yang dikecualikan (pembelian marketplace)
const PURCHASE_TYPES = ["Pembelian", "Pembelian (Transfer)"];

// ── GET: Semua transaksi TrashCash ──────────────────────────────────────────
export async function GET(request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status"); // "pending" | "selesai" | null

    const where = {
      NOT: { jenis: { in: PURCHASE_TYPES } },
      ...(statusFilter && { status: statusFilter }),
    };

    const transaksi = await prisma.transaksi.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true, poinHijau: true } },
      },
    });

    // Statistik ringkasan
    const [totalPending, totalSelesai, totalUser] = await Promise.all([
      prisma.transaksi.count({ where: { status: "pending", NOT: { jenis: { in: PURCHASE_TYPES } } } }),
      prisma.transaksi.count({ where: { status: "selesai", NOT: { jenis: { in: PURCHASE_TYPES } } } }),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      transaksi,
      stats: { totalPending, totalSelesai, totalUser },
    });
  } catch (error) {
    console.error("Admin GET transaksi error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ── PATCH: Konfirmasi transaksi + berikan koin ke user ──────────────────────
export async function PATCH(request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { kode } = await request.json();
    if (!kode) {
      return NextResponse.json({ error: "Kode transaksi diperlukan." }, { status: 400 });
    }

    const transaksi = await prisma.transaksi.findUnique({
      where: { kode },
      include: { user: true },
    });

    if (!transaksi) {
      return NextResponse.json(
        { error: `Transaksi dengan kode "${kode}" tidak ditemukan.` },
        { status: 404 }
      );
    }

    if (transaksi.status === "selesai") {
      return NextResponse.json(
        { error: "Transaksi ini sudah dikonfirmasi sebelumnya.", transaksi },
        { status: 409 }
      );
    }

    if (PURCHASE_TYPES.includes(transaksi.jenis)) {
      return NextResponse.json(
        { error: "Transaksi pembelian tidak dapat dikonfirmasi di sini." },
        { status: 400 }
      );
    }

    const poinEarned = Math.floor(transaksi.jumlah * 10);

    // Atomik: update status + increment koin user sekaligus
    const [updatedTx] = await prisma.$transaction([
      prisma.transaksi.update({
        where: { kode },
        data: { status: "selesai" },
        include: { user: { select: { name: true, email: true, poinHijau: true } } },
      }),
      prisma.user.update({
        where: { id: transaksi.userId },
        data: { poinHijau: { increment: poinEarned } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Transaksi ${kode} berhasil dikonfirmasi! ${poinEarned} koin diberikan ke ${transaksi.user.name}.`,
      poinEarned,
      transaksi: updatedTx,
    });
  } catch (error) {
    console.error("Admin PATCH konfirmasi error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ── DELETE: Logout admin ────────────────────────────────────────────────────
export async function DELETE() {
  await clearAdminCookie();
  return NextResponse.json({ success: true });
}
