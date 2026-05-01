import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { sendTelegramNotification } from "@/lib/telegram";

// Menghitung estimasi barang tiba (4 hari dari sekarang)
function getEstimasiTiba() {
  const d = new Date();
  d.setDate(d.getDate() + 4);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// Menghasilkan ID unik untuk pembelian (format: BLI-tgl-random)
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
    // Memeriksa autentikasi pengguna
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Sesi tidak valid. Harap masuk (login) terlebih dahulu." }, { status: 401 });
    }

    const { productId, productName, coins, price, paymentMethod } = await request.json();

    // Memastikan kelengkapan data pembelian
    if (!productId || !productName || paymentMethod === undefined) {
      return NextResponse.json({ error: "Data pembelian tidak lengkap." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { poinHijau: true, name: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    const kode = generateKodePembelian();
    const estimasiTiba = getEstimasiTiba();

    // Proses pembayaran menggunakan Poin Hijau
    if (paymentMethod === "coins") {
      if (user.poinHijau < coins) {
        return NextResponse.json(
          { error: `Poin Hijau tidak mencukupi. Saldo Anda: ${user.poinHijau}, Dibutuhkan: ${coins}` },
          { status: 400 }
        );
      }

      // Mengurangi Poin Hijau dan mencatat riwayat transaksi secara atomik
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

      const tgMessage = `🛒 <b>PEMBELIAN BARU (Koin)</b> 🛒\n\n👤 <b>User:</b> ${user.name} (${user.email})\n📦 <b>Barang:</b> ${productName}\n💳 <b>Harga:</b> ${coins} Koin\n🧾 <b>Kode:</b> ${kode}\n\n✅ <i>Lunas. Segera proses pengiriman!</i>`;
      sendTelegramNotification(tgMessage);

      return NextResponse.json({
        success: true,
        message: `Pembelian produk "${productName}" berhasil.`,
        remainingCoins: updatedUser.poinHijau,
        estimasiTiba,
        kode,
        paymentMethod: "coins",
      });
    }

    // Proses pembayaran menggunakan Transfer Bank (Uang Tunai)
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

      const tgMessageCash = `🛒 <b>PEMBELIAN BARU (Transfer)</b> 🛒\n\n👤 <b>User:</b> ${user.name} (${user.email})\n📦 <b>Barang:</b> ${productName}\n💵 <b>Harga:</b> Rp ${price.toLocaleString('id-ID')}\n🧾 <b>Kode:</b> ${kode}\n\n⏳ <i>Status: Menunggu Pembayaran dari User.</i>`;
      sendTelegramNotification(tgMessageCash);

      return NextResponse.json({
        success: true,
        message: `Pesanan "${productName}" berhasil dibuat. Silakan lakukan pembayaran.`,
        estimasiTiba,
        kode,
        paymentMethod: "cash",
      });
    }

    return NextResponse.json({ error: "Metode pembayaran tidak valid." }, { status: 400 });
  } catch (error) {
    console.error("Kesalahan sistem saat memproses pembelian:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal pada server." }, { status: 500 });
  }
}
