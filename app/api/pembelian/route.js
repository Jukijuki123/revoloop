import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// itung estimasi barang nyampe (4 hari dari skrg)
function getEstimasiTiba() {
  const d = new Date();
  d.setDate(d.getDate() + 4);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// generate id unik buat belanjaan (format: BLI-tgl-random)
function generateKodePembelian() {
  const now = new Date();
  const tanggal =
    now.getFullYear().toString().slice(-2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BLI-${tanggal}-${random}`;
}

export async function POST(request) {
  try {
    // cek login dulu
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Login dulu bos" }, { status: 401 });
    }

    const { productId, productName, coins, price, paymentMethod } = await request.json();

    // pastiin datanya ga kosong
    if (!productId || !productName || paymentMethod === undefined) {
      return NextResponse.json({ error: "Data belanjaan ga lengkap" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { poinHijau: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User ga ketemu" }, { status: 404 });
    }

    const kode = generateKodePembelian();
    const estimasiTiba = getEstimasiTiba();

    // Kalo bayar pake koin
    if (paymentMethod === "coins") {
      if (user.poinHijau < coins) {
        return NextResponse.json(
          { error: `Koin kurang. Punya: ${user.poinHijau}, butuh: ${coins}` },
          { status: 400 }
        );
      }

      // potong koin dan buat riwayat sekaligus (biar aman ga gantung)
      const [updatedUser] = await prisma.$transaction([
        prisma.user.update({
          where: { id: session.userId },
          data: { poinHijau: { decrement: coins } },
          select: { poinHijau: true },
        }),
        prisma.transaksi.create({
          data: {
            kode,
            jenis: "Pembelian",
            jumlah: coins,       
            lokasi: productName, 
            jadwal: new Date(),
            harga: -coins,       
            status: "selesai",
            userId: session.userId,
          },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: `Hore! Berhasil beli "${productName}"`,
        remainingCoins: updatedUser.poinHijau,
        estimasiTiba,
        kode,
        paymentMethod: "coins",
      });
    }

    // Kalo bayar pake duit (transfer)
    if (paymentMethod === "cash") {
      await prisma.transaksi.create({
        data: {
          kode,
          jenis: "Pembelian (Transfer)",
          jumlah: 0,
          lokasi: productName,
          jadwal: new Date(),
          harga: -(price || 0), 
          status: "menunggu_pembayaran",
          userId: session.userId,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Pesanan "${productName}" kebuat, ditunggu bayarannya ya`,
        estimasiTiba,
        kode,
        paymentMethod: "cash",
      });
    }

    return NextResponse.json({ error: "Metode bayar ga bener" }, { status: 400 });
  } catch (error) {
    console.error("error pas beli:", error);
    return NextResponse.json({ error: "Aduh servernya error" }, { status: 500 });
  }
}
