"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import TrashForm from "@/components/features/trashcash/TrashForm";
import PickupForm from "@/components/features/trashcash/PickupForm";
import TrashPopup from "@/components/features/trashcash/TrashPopup";
import { hargaPerKg } from "@/data/hargaSampah";
import { generateKodeTransaksi } from "@/lib/utils/generateKode";
import { formatTanggal } from "@/lib/utils/formatTanggal";
import { Building2, Truck, CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

// Toast component
function Toast({ toast, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const config = {
    success: { icon: <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />, cls: "bg-green-50 border-green-200" },
    error: { icon: <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />, cls: "bg-red-50 border-red-200" },
    info: { icon: <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />, cls: "bg-blue-50 border-blue-200" },
  };
  const { icon, cls } = config[toast.type] || config.info;
  return (
    <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`flex items-start gap-3 p-4 rounded-2xl border shadow-lg max-w-sm w-full ${cls}`}>
      {icon}
      <p className="text-sm text-gray-800 font-medium flex-1">{toast.message}</p>
      <button onClick={onClose}><X className="w-4 h-4 text-gray-400 hover:text-gray-600" /></button>
    </motion.div>
  );
}

// Leaflet requires `window` — must be loaded only on client
const MapPicker = dynamic(() => import("@/components/features/trashcash/MapPicker"), { ssr: false });

export default function TrashCashPage() {
  const todayStr = new Date().toISOString().split("T")[0];

  // App State
  const [mode, setMode] = useState("dropoff"); // "dropoff" | "pickup"
  const [selectedBank, setSelectedBank] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [kodeTransaksi, setKodeTransaksi] = useState("");
  const [detail, setDetail] = useState({});
  const [toast, setToast] = useState(null);

  // Form State (Shared)
  const [jenis, setJenis] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [tanggal, setTanggal] = useState(todayStr);
  const [waktu, setWaktu] = useState("");

  // Form State (Pickup specific)
  const [alamat, setAlamat] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 8; h <= 16; h++) slots.push(`${h.toString().padStart(2, "0")}:00`);
    return slots;
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("pendingTrashCash");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.mode) setMode(data.mode);
        if (data.jenis) setJenis(data.jenis);
        if (data.jumlah) setJumlah(data.jumlah);
        if (data.tanggal) setTanggal(data.tanggal);
        if (data.waktu) setWaktu(data.waktu);
        if (data.selectedBank) setSelectedBank(data.selectedBank);
        if (data.alamat) setAlamat(data.alamat);
        if (data.whatsapp) setWhatsapp(data.whatsapp);
      } catch (e) {}
      localStorage.removeItem("pendingTrashCash");
    }
  }, []);

  const handleChangeLocation = () => {
    setSelectedBank(null);
    setJenis("");
    setJumlah(1);
    setWaktu("");
  };

  const handleSubmitDropoff = async () => {
    if (!jenis || !selectedBank || !tanggal || !waktu) { setToast({ type: "error", message: "Lengkapi semua field." }); return; }

    const harga = jumlah * (hargaPerKg[jenis] || 0);
    const kode = generateKodeTransaksi();

    try {
      const res = await fetch("/api/transaksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kode, jenis, jumlah, lokasi: selectedBank.nama, jadwal: `${tanggal}T${waktu}`, harga }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setToast({ type: "info", message: "Silakan Masuk (Login) terlebih dahulu untuk menukarkan sampah." });
          localStorage.setItem("pendingTrashCash", JSON.stringify({ mode, jenis, jumlah, tanggal, waktu, selectedBank }));
          setTimeout(() => { window.location.href = "/auth/login?callbackUrl=/trashcash"; }, 2000);
        } else {
          setToast({ type: "error", message: "Gagal memproses transaksi." });
        }
        return;
      }

      const formattedHarga = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(harga);
      const transaksi = { kode, jenis, jumlah: `${jumlah} kg`, lokasi: selectedBank.nama, jadwal: `${formatTanggal(tanggal)} ${waktu}`, harga: formattedHarga };

      setDetail(transaksi); setKodeTransaksi(kode); setPopupOpen(true);
      window.dispatchEvent(new Event("user-updated"));
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Terjadi kesalahan sistem." });
    }
  };

  const handleSubmitPickup = async () => {
    if (!alamat || !jenis || !tanggal || !waktu || !whatsapp) { setToast({ type: "error", message: "Lengkapi semua field." }); return; }

    if (jumlah < 3) {
      setToast({ type: "error", message: "Maaf, minimal berat sampah untuk layanan Pickup adalah 3 kg." });
      return;
    }

    const harga = jumlah * (hargaPerKg[jenis] || 0);
    const kode = generateKodeTransaksi();

    try {
      const res = await fetch("/api/transaksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Appending pickup indicator to lokasi for MVP since DB schema isn't changed
        body: JSON.stringify({ kode, jenis, jumlah, lokasi: `PICKUP: ${alamat} (WA: ${whatsapp})`, jadwal: `${tanggal}T${waktu}`, harga }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setToast({ type: "info", message: "Silakan Masuk (Login) terlebih dahulu untuk menukarkan sampah." });
          localStorage.setItem("pendingTrashCash", JSON.stringify({ mode, jenis, jumlah, tanggal, waktu, alamat, whatsapp }));
          setTimeout(() => { window.location.href = "/auth/login?callbackUrl=/trashcash"; }, 2000);
        } else {
          setToast({ type: "error", message: "Gagal memproses transaksi." });
        }
        return;
      }

      const formattedHarga = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(harga);
      const transaksi = { kode, jenis, jumlah: `${jumlah} kg`, lokasi: "Layanan Pickup Rumah", jadwal: `${formatTanggal(tanggal)} ${waktu}`, harga: formattedHarga };

      setDetail(transaksi); setKodeTransaksi(kode); setPopupOpen(true);
      window.dispatchEvent(new Event("user-updated"));
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Terjadi kesalahan sistem." });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* ─── Header ─────────────────────────────────────────────── */}
      <div className="relative bg-primary-dark overflow-hidden pt-10 pb-14 px-4">
        {/* Dekorasi */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-8 w-32 h-32 bg-secondary/10 rounded-full translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-xl mx-auto text-center mb-7">
          <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-secondary bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full mb-3">
            Daur Ulang Sampah
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-1">Tukar Sampah</h1>
          <p className="text-green-200 text-sm">Pilih metode dan dapatkan Poin Hijau</p>
        </div>

        {/* ── Toggle Drop-off / Pickup ─────────────────────────── */}
        <div className="relative max-w-xl mx-auto">
          <div className="flex bg-white/20 p-1 rounded-full backdrop-blur-sm">
            <button
              onClick={() => { setMode("dropoff"); setSelectedBank(null); }}
              className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${mode === "dropoff" ? "bg-white text-primary-dark shadow-md" : "text-white hover:bg-white/10"
                }`}
            >
              <Building2 className="w-4 h-4" />
              Antar ke Bank
            </button>
            <button
              onClick={() => setMode("pickup")}
              className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${mode === "pickup" ? "bg-white text-primary-dark shadow-md" : "text-white hover:bg-white/10"
                }`}
            >
              <Truck className="w-4 h-4" />
              Jemput dari Rumah
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`mx-auto -mt-6 px-4 relative z-20 transition-all duration-500 ${mode === "dropoff" && !selectedBank ? "max-w-5xl" : "max-w-xl"}`}>
        {mode === "dropoff" && (
          !selectedBank ? (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-[600px] flex flex-col">
              <MapPicker onSelect={(bank) => setSelectedBank(bank)} isEmbedded={true} />
            </div>
          ) : (
            <TrashForm
              jenis={jenis} setJenis={setJenis}
              jumlah={jumlah} setJumlah={setJumlah}
              lokasi={selectedBank.nama}
              tanggal={tanggal} setTanggal={setTanggal}
              waktu={waktu} setWaktu={setWaktu}
              timeSlots={timeSlots}
              handleSubmit={handleSubmitDropoff}
              selectedBank={selectedBank}
              onChangeLocation={handleChangeLocation}
            />
          )
        )}

        {mode === "pickup" && (
          <PickupForm
            alamat={alamat} setAlamat={setAlamat}
            jenis={jenis} setJenis={setJenis}
            jumlah={jumlah} setJumlah={setJumlah}
            tanggal={tanggal} setTanggal={setTanggal}
            waktu={waktu} setWaktu={setWaktu}
            whatsapp={whatsapp} setWhatsapp={setWhatsapp}
            timeSlots={timeSlots}
            handleSubmit={handleSubmitPickup}
          />
        )}
      </div>

      <TrashPopup popupOpen={popupOpen} setPopupOpen={setPopupOpen} kodeTransaksi={kodeTransaksi} detail={detail} />

      {/* Toast Notification */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 w-full flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence>
            {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
