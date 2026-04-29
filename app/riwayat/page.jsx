"use client";

import { useEffect, useState } from "react";
import { Coins, ArrowUpCircle, ArrowDownCircle, Loader2, History, Package, Recycle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function formatRupiah(val) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Math.abs(val));
}

function formatTanggal(dateStr) {
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const statusLabel = {
  pending: { label: "Sedang Diproses", cls: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  selesai: { label: "Selesai", cls: "bg-green-50 text-green-700 border-green-200" },
  menunggu_pembayaran: { label: "Menunggu Bayar", cls: "bg-blue-50 text-blue-700 border-blue-200" },
};

export default function RiwayatPage() {
  const [transaksi, setTransaksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("Semua"); // "Semua" | "Masuk" | "Keluar"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meRes, txRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/transaksi"),
        ]);

        if (meRes.status === 401 || txRes.status === 401) {
          setError("unauthorized");
          setIsLoading(false);
          return;
        }

        const meData = await meRes.json();
        const txData = await txRes.json();

        setUser(meData.user);
        setTransaksi(txData.transaksi || []);
      } catch (e) {
        setError("Gagal memuat data. Periksa koneksi internet kamu.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const isPembelian = (tx) => tx.jenis === "Pembelian" || tx.jenis === "Pembelian (Transfer)";

  const filtered = transaksi.filter((tx) => {
    if (filter === "Masuk") return !isPembelian(tx);
    if (filter === "Keluar") return isPembelian(tx);
    return true;
  });

  const totalMasuk = transaksi.filter((tx) => !isPembelian(tx)).reduce((acc, tx) => acc + (tx.jumlah || 0) * 10, 0);
  const totalKeluar = transaksi.filter((tx) => isPembelian(tx)).reduce((acc, tx) => acc + Math.abs(tx.harga), 0);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-primary-dark animate-spin" />
        <p className="text-gray-600 font-medium">Memuat riwayat...</p>
      </div>
    </div>
  );

  if (error === "unauthorized") return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-sm">
        <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Login Diperlukan</h2>
        <p className="text-gray-500 mb-6">Kamu harus login untuk melihat riwayat transaksi.</p>
        <Link href="/auth/login" className="inline-flex items-center gap-2 bg-primary-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition">
          Masuk Sekarang
        </Link>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <p className="text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ─── Header ──────────────────────────────────────────────── */}
      <div className="relative bg-white border-b border-gray-100 overflow-hidden px-4 pt-10 pb-6">
        {/* Decorative dots */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-50 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #16a34a18 1.5px, transparent 1.5px)", backgroundSize: "18px 18px" }} />

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-7 h-7 text-primary-dark" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Riwayat Transaksi</h1>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Semua aktivitas koin masuk dan keluar tercatat di sini, <span className="font-semibold text-gray-600">{user?.name}</span>.
          </p>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-primary-dark/5 border border-primary-dark/10 rounded-2xl p-3.5 text-center">
              <Coins className="w-4 h-4 text-primary-dark mx-auto mb-1" />
              <p className="text-xl font-extrabold text-primary-dark">{user?.poinHijau ?? 0}</p>
              <p className="text-[10px] text-gray-400">Saldo Koin</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-3.5 text-center">
              <ArrowUpCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
              <p className="text-xl font-extrabold text-green-700">{totalMasuk}</p>
              <p className="text-[10px] text-gray-400">Total Masuk</p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-3.5 text-center">
              <ArrowDownCircle className="w-4 h-4 text-red-500 mx-auto mb-1" />
              <p className="text-xl font-extrabold text-red-600">{totalKeluar}</p>
              <p className="text-[10px] text-gray-400">Total Keluar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-2xl mx-auto px-4 mt-4 mb-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 flex gap-1">
          {["Semua", "Masuk", "Keluar"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${filter === f ? "bg-primary-dark text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="max-w-2xl mx-auto px-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <History className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">Belum ada transaksi</h3>
            <p className="text-gray-400 text-sm mt-1">Yuk mulai tukar sampah atau belanja di marketplace!</p>
            <div className="flex gap-3 justify-center mt-6">
              <Link href="/trashcash" className="px-5 py-2.5 bg-primary-dark text-white text-sm font-semibold rounded-full hover:bg-green-800 transition">Tukar Sampah</Link>
              <Link href="/marketplace" className="px-5 py-2.5 border-2 border-primary-dark text-primary-dark text-sm font-semibold rounded-full hover:bg-primary-dark hover:text-white transition">Marketplace</Link>
            </div>
          </div>
        ) : (
          filtered.map((tx, idx) => {
            const isOut = isPembelian(tx);
            const statusInfo = statusLabel[tx.status] || statusLabel.pending;

            return (
              <motion.div key={tx.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition flex items-start gap-4">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${isOut ? "bg-red-50" : "bg-green-50"}`}>
                  {isOut
                    ? <Package className="w-5 h-5 text-red-500" />
                    : <Recycle className="w-5 h-5 text-green-600" />
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">
                        {isOut ? tx.lokasi : `Tukar Sampah — ${tx.jenis}`}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatTanggal(tx.createdAt)}</p>
                      {tx.kode && <p className="text-xs text-gray-400 font-mono mt-0.5">#{tx.kode}</p>}
                    </div>
                    {/* Amount */}
                    <div className="text-right flex-shrink-0">
                      {!isOut ? (
                        // TrashCash: coin earned
                        <>
                          <p className="font-extrabold text-base text-green-600">
                            +{Math.floor(tx.jumlah * 10)} koin
                          </p>
                          <p className="text-xs text-gray-400">{formatRupiah(tx.harga)}</p>
                        </>
                      ) : tx.jenis === "Pembelian (Transfer)" ? (
                        // Cash purchase: show rupiah
                        <>
                          <p className="font-extrabold text-base text-red-500">
                            −{formatRupiah(tx.harga)}
                          </p>
                          <p className="text-xs text-gray-400">Pembayaran Rupiah</p>
                        </>
                      ) : (
                        // Coin purchase: show coins
                        <>
                          <p className="font-extrabold text-base text-red-500">
                            −{Math.abs(tx.harga)} koin
                          </p>
                          <p className="text-xs text-gray-400">Pembayaran Koin</p>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
