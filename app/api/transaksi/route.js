// ─────────────────────────────────────────────────────────────────────────────
// API: /api/transaksi
// GET  — Ambil riwayat transaksi milik user yang sedang login
// POST — Buat transaksi TrashCash baru (koin belum diberikan sampai admin konfirmasi)
// ─────────────────────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// ── GET: Riwayat transaksi user ─────────────────────────────────────────────
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const transaksi = await prisma.transaksi.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ transaksi });
  } catch (error) {
    console.error("Transaksi GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ── POST: Buat transaksi TrashCash baru ─────────────────────────────────────
// Koin TIDAK diberikan di sini — admin harus konfirmasi terlebih dahulu.
export async function POST(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { kode, jenis, jumlah, lokasi, jadwal, harga } = await request.json();

    const transaksi = await prisma.transaksi.create({
      data: {
        kode,
        jenis,
        jumlah,
        lokasi,
        jadwal: new Date(jadwal),
        harga,
        userId: session.userId,
        // status default: "pending" (menunggu konfirmasi admin)
      },
    });

    return NextResponse.json({ transaksi }, { status: 201 });
  } catch (error) {
    console.error("Transaksi POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
