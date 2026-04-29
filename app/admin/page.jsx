"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck, LogOut, Users, CheckCircle, Clock, RefreshCw,
  QrCode, X, ScanLine, AlertCircle, Loader2, ChevronRight,
  Recycle, Package, Coins
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatTanggal(d) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function formatRupiah(val) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Math.abs(val));
}

// Status badge helper
function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    selesai: "bg-green-50 text-green-700 border-green-200",
  };
  const labels = { pending: "Menunggu Konfirmasi", selesai: "Selesai" };
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${map[status] || map.pending}`}>
      {labels[status] || status}
    </span>
  );
}

// ─── QR Scanner Component ─────────────────────────────────────────────────────
function QRScanner({ onDetect, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animRef = useRef(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const detectorRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
  }, []);

  useEffect(() => {
    let cancelled = false;

    const startCamera = async () => {
      // Check BarcodeDetector support
      if (!("BarcodeDetector" in window)) {
        setError("Browser kamu tidak mendukung pemindai QR otomatis. Gunakan input manual.");
        return;
      }
      try {
        detectorRef.current = new window.BarcodeDetector({ formats: ["qr_code"] });
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 720 }, height: { ideal: 720 } },
        });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setScanning(true);
      } catch (e) {
        setError("Tidak dapat mengakses kamera. Pastikan izin kamera diaktifkan.");
      }
    };

    startCamera();
    return () => { cancelled = true; stopCamera(); };
  }, [stopCamera]);

  useEffect(() => {
    if (!scanning) return;
    const detect = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.readyState < 2) {
        animRef.current = requestAnimationFrame(detect);
        return;
      }
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      try {
        const barcodes = await detectorRef.current.detect(canvas);
        if (barcodes.length > 0) {
          const raw = barcodes[0].rawValue.trim();
          stopCamera();
          onDetect(raw);
          return;
        }
      } catch { /* keep scanning */ }
      animRef.current = requestAnimationFrame(detect);
    };
    animRef.current = requestAnimationFrame(detect);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [scanning, onDetect, stopCamera]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm">
        {/* Header */}
        <div className="bg-primary-dark px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <ScanLine className="w-5 h-5 text-secondary" />
            <h3 className="font-bold">Scan QR Transaksi</h3>
          </div>
          <button onClick={() => { stopCamera(); onClose(); }} className="text-white/70 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera View */}
        <div className="relative bg-gray-900 aspect-square overflow-hidden">
          {!error ? (
            <>
              <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
              <canvas ref={canvasRef} className="hidden" />
              {/* Scan overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-56 h-56">
                  {/* Corner borders */}
                  <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-secondary rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-secondary rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-secondary rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-secondary rounded-br-lg" />
                  {/* Scanning line animation */}
                  <motion.div className="absolute left-2 right-2 h-0.5 bg-secondary shadow-lg"
                    animate={{ top: ["10%", "90%", "10%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                </div>
              </div>
              <p className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-xs">Arahkan kamera ke QR Code pengguna</p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 p-6">
              <AlertCircle className="w-12 h-12 text-red-400" />
              <p className="text-white/80 text-sm text-center">{error}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Confirm Dialog ────────────────────────────────────────────────────────────
function ConfirmDialog({ tx, onConfirm, onCancel, isLoading }) {
  const poinEarned = Math.floor(tx.jumlah * 10);
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 text-center mb-1">Konfirmasi Transaksi</h3>
        <p className="text-sm text-gray-500 text-center mb-5">Pastikan sampah sudah ditimbang dan sesuai sebelum konfirmasi.</p>

        <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 mb-5 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Kode</span><span className="font-mono font-bold text-primary-dark">{tx.kode}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Pengguna</span><span className="font-semibold">{tx.user?.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Jenis Sampah</span><span className="font-semibold">{tx.jenis}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Jumlah</span><span className="font-semibold">{tx.jumlah} kg</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Estimasi Nilai</span><span className="font-semibold">{formatRupiah(tx.harga)}</span></div>
          <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
            <span className="text-gray-700 font-bold">Koin Diberikan</span>
            <span className="font-extrabold text-yellow-600 flex items-center gap-1"><Coins className="w-4 h-4" />+{poinEarned} koin</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onCancel} disabled={isLoading}
            className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition disabled:opacity-50 text-sm">
            Batal
          </button>
          <button onClick={() => onConfirm(tx.kode)} disabled={isLoading}
            className="flex-1 py-3 bg-primary-dark text-white font-bold rounded-xl hover:bg-green-800 transition flex items-center justify-center gap-2 disabled:opacity-70 text-sm">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            Ya, Konfirmasi
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Admin Dashboard ──────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [transaksi, setTransaksi] = useState([]);
  const [stats, setStats] = useState({ totalPending: 0, totalSelesai: 0, totalUser: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [showScanner, setShowScanner] = useState(false);
  const [manualKode, setManualKode] = useState("");
  const [pendingConfirm, setPendingConfirm] = useState(null); // tx to confirm
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 5000);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/transaksi?status=${filter}`);
      if (res.status === 401) { router.push("/admin/login"); return; }
      const data = await res.json();
      setTransaksi(data.transaksi || []);
      if (data.stats) setStats(data.stats);
    } catch {
      showToast("Gagal memuat data.", "error");
    } finally {
      setIsLoading(false);
    }
  }, [filter, router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleLogout = async () => {
    await fetch("/api/admin/transaksi", { method: "DELETE" });
    router.push("/admin/login");
  };

  const handleQRDetected = async (kode) => {
    setShowScanner(false);
    // Find transaction in list or fetch directly
    const tx = transaksi.find(t => t.kode === kode);
    if (tx) {
      setPendingConfirm(tx);
    } else {
      // Fetch from server
      try {
        const res = await fetch("/api/admin/transaksi");
        const data = await res.json();
        const found = data.transaksi?.find(t => t.kode === kode);
        if (found) {
          setPendingConfirm(found);
        } else {
          showToast(`Transaksi "${kode}" tidak ditemukan.`, "error");
        }
      } catch {
        showToast("Gagal mencari transaksi.", "error");
      }
    }
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (!manualKode.trim()) return;
    handleQRDetected(manualKode.trim().toUpperCase());
    setManualKode("");
  };

  const handleConfirm = async (kode) => {
    setConfirmLoading(true);
    try {
      const res = await fetch("/api/admin/transaksi", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kode }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message, "success");
        setPendingConfirm(null);
        fetchData();
      } else {
        showToast(data.error || "Konfirmasi gagal.", "error");
        if (res.status === 409) setPendingConfirm(null); // already confirmed
      }
    } catch {
      showToast("Terjadi kesalahan jaringan.", "error");
    } finally {
      setConfirmLoading(false);
    }
  };

  const filtered = transaksi; // already filtered by API query param

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Admin */}
      <header className="bg-primary-dark shadow-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-secondary/20 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-green-300 font-medium uppercase tracking-wide">Panel Admin</p>
              <p className="text-white font-bold text-sm leading-tight">REVOLOOP — Bank Sampah</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchData} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium hover:bg-white/10 px-3 py-1.5 rounded-xl transition">
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Menunggu Konfirmasi", value: stats.totalPending, icon: Clock, color: "text-yellow-600 bg-yellow-50", border: "border-yellow-200" },
            { label: "Transaksi Selesai", value: stats.totalSelesai, icon: CheckCircle, color: "text-green-700 bg-green-50", border: "border-green-200" },
            { label: "Total Pengguna", value: stats.totalUser, icon: Users, color: "text-blue-700 bg-blue-50", border: "border-blue-200" },
          ].map(({ label, value, icon: Icon, color, border }) => (
            <div key={label} className={`bg-white rounded-2xl border ${border} p-5 flex items-center gap-4 shadow-sm`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} flex-shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* QR Scan Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary-dark" />
            Konfirmasi Transaksi
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Scan button */}
            <button onClick={() => setShowScanner(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-primary-dark text-white font-bold rounded-xl hover:bg-green-800 transition shadow-sm flex-1">
              <ScanLine className="w-5 h-5" /> Scan QR Code
            </button>
            {/* Manual input */}
            <form onSubmit={handleManualSearch} className="flex gap-2 flex-1">
              <input type="text" value={manualKode} onChange={(e) => setManualKode(e.target.value)}
                placeholder="Masukkan kode manual (cth: TC2504-XXXX)"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:bg-white transition text-sm font-mono uppercase"
              />
              <button type="submit" className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition text-sm">
                Cari
              </button>
            </form>
          </div>
          <p className="text-xs text-gray-400 mt-3">💡 Scan QR dari layar pengguna, atau ketik kode transaksi secara manual.</p>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Filter tabs */}
          <div className="flex border-b border-gray-100 px-5 pt-5 gap-3">
            {["pending", "selesai"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`pb-3 text-sm font-bold border-b-2 transition capitalize ${filter === f ? "border-primary-dark text-primary-dark" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
                {f === "pending" ? `Menunggu (${stats.totalPending})` : `Selesai (${stats.totalSelesai})`}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-5">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="w-8 h-8 text-primary-dark animate-spin" />
                <p className="text-gray-500 text-sm">Memuat data transaksi...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <Recycle className="w-14 h-14 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Tidak ada transaksi {filter === "pending" ? "yang menunggu konfirmasi" : "yang selesai"}.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((tx, idx) => (
                  <motion.div key={tx.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="border border-gray-100 rounded-2xl p-4 hover:border-primary-dark/30 hover:shadow-sm transition group">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${tx.status === "selesai" ? "bg-green-50" : "bg-yellow-50"}`}>
                        {tx.status === "selesai"
                          ? <CheckCircle className="w-5 h-5 text-green-600" />
                          : <Clock className="w-5 h-5 text-yellow-600" />
                        }
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{tx.user?.name}</p>
                            <p className="text-xs text-gray-400">{tx.user?.email}</p>
                          </div>
                          <StatusBadge status={tx.status} />
                        </div>

                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 text-xs text-gray-600">
                          <span><span className="text-gray-400">Kode:</span> <span className="font-mono font-semibold">{tx.kode}</span></span>
                          <span><span className="text-gray-400">Jenis:</span> {tx.jenis}</span>
                          <span><span className="text-gray-400">Jumlah:</span> {tx.jumlah} kg</span>
                          <span><span className="text-gray-400">Koin:</span> +{Math.floor(tx.jumlah * 10)} koin</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{formatTanggal(tx.createdAt)}</p>
                      </div>

                      {/* Action */}
                      {tx.status === "pending" && (
                        <button onClick={() => setPendingConfirm(tx)}
                          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-primary-dark text-white text-xs font-bold rounded-xl hover:bg-green-800 transition opacity-0 group-hover:opacity-100 sm:opacity-100">
                          <CheckCircle className="w-3.5 h-3.5" /> Konfirmasi
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border max-w-sm ${
              toast.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}>
            {toast.type === "success"
              ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              : <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            }
            <p className={`text-sm font-medium ${toast.type === "success" ? "text-green-800" : "text-red-800"}`}>{toast.msg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {showScanner && <QRScanner onDetect={handleQRDetected} onClose={() => setShowScanner(false)} />}
        {pendingConfirm && (
          <ConfirmDialog
            tx={pendingConfirm}
            onConfirm={handleConfirm}
            onCancel={() => setPendingConfirm(null)}
            isLoading={confirmLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
