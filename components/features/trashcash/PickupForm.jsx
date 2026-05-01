"use client";

import { Info, MapPin, Truck } from "lucide-react";
import { hargaPerKg } from "@/data/hargaSampah";

export default function PickupForm({
  alamat, setAlamat,
  jenis, setJenis,
  jumlah, setJumlah,
  tanggal, setTanggal,
  waktu, setWaktu,
  whatsapp, setWhatsapp,
  timeSlots = [],
  handleSubmit
}) {
  const todayStr = new Date().toISOString().split("T")[0];
  const estimasiHarga = jenis && jumlah ? jumlah * (hargaPerKg[jenis] || 0) : 0;
  const formatRupiah = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

  // Validate realtime to show error styling if needed
  const isJumlahValid = jumlah >= 3;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 md:p-6 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Alamat */}
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-1.5">Alamat Lengkap</label>
        <div className="relative">
          <textarea
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            rows="3"
            placeholder="Masukkan detail alamat penjemputan..."
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:bg-white text-gray-700 resize-none transition"
          />
          <button
            type="button"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(() => {
                  setAlamat("Jl. Terdeteksi Otomatis No.1, Jakarta"); // Mock auto-detect for MVP
                });
              }
            }}
            className="absolute right-3 top-3 text-gray-400 hover:text-primary-dark transition"
            title="Deteksi Lokasi Saya"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Jenis Sampah */}
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-1.5">Jenis Sampah</label>
        <select value={jenis} onChange={(e) => setJenis(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:bg-white transition appearance-none cursor-pointer">
          <option value="">Pilih jenis sampah</option>
          <option value="Plastik">Plastik</option>
          <option value="Kertas">Kertas</option>
          <option value="Logam">Logam</option>
          <option value="Kaca">Kaca</option>
          <option value="Organik">Organik</option>
        </select>
      </div>

      {/* Estimasi Berat */}
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-1.5 flex justify-between">
          Estimasi Berat (kg)
          {!isJumlahValid && <span className="text-red-500 text-xs font-normal">Min. 3 kg</span>}
        </label>
        <div className={`flex items-center border rounded-xl overflow-hidden w-full transition ${!isJumlahValid ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'}`}>
          <button type="button" onClick={() => setJumlah((prev) => Math.max(1, Number(prev) - 1))} className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-primary-dark text-2xl font-bold hover:bg-primary-dark-dark/10 transition">−</button>
          <input type="number" value={jumlah} min={1} inputMode="numeric"
            onChange={(e) => {
              const v = e.target.value;
              if (v === "") { setJumlah(""); return; }
              const num = Number(v);
              if (!Number.isNaN(num) && num >= 1) setJumlah(num);
            }}
            onBlur={() => { if (!jumlah || jumlah < 1) setJumlah(1); }}
            className="flex-1 min-w-0 text-center h-12 text-gray-800 font-bold focus:outline-none appearance-none bg-gray-50"
          />
          <div className="bg-gray-50 h-12 flex items-center pr-2 text-gray-400 text-sm">kg</div>
          <button type="button" onClick={() => setJumlah((prev) => (prev ? Number(prev) + 1 : 1))} className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-primary-dark text-2xl font-bold hover:bg-primary-dark-dark transition">+</button>
        </div>

        {estimasiHarga > 0 && (
          <div className="mt-2 text-sm font-medium flex justify-between items-center bg-primary-dark/10 px-3 py-2 rounded-lg">
            <span className="text-primary-dark">Estimasi Koin Didapat</span>
            <span className="text-primary-dark font-bold">~ {formatRupiah(estimasiHarga)}</span>
          </div>
        )}
      </div>

      {/* Jadwal Pickup */}
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-1.5">Jadwal Pickup</label>
        <div className="grid grid-cols-2 gap-3">
          <input type="date" value={tanggal} min={todayStr} onChange={(e) => setTanggal(e.target.value)} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:bg-white transition" />
          <select value={waktu} onChange={(e) => setWaktu(e.target.value)} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:bg-white transition appearance-none">
            <option value="">Jam</option>
            {timeSlots.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
      </div>

      {/* Nomor WhatsApp */}
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-1.5">Nomor WhatsApp</label>
        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="0812 3456 7890"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:bg-white text-gray-700 transition"
        />
      </div>

      {/* Info Box */}
      <div className="bg-primary/10 border border-primary-dark  rounded-xl p-4 flex gap-3 items-start">
        <Info className="w-5 h-5 text-primary-dark flex-shrink-0 mt-0.5" />
        <div className="text-sm text-primary-dark  space-y-1">
          <p className="font-semibold">Informasi Layanan</p>
          <ul className="list-disc pl-4 text-primary-dark /80 space-y-0.5">
            <li>Minimal berat sampah adalah <strong className="text-primary-dark ">3 kg</strong>.</li>
            <li>Tim kami akan menghubungi Anda via WhatsApp untuk konfirmasi penjemputan.</li>
            <li>Pastikan sampah sudah dipilah dan diikat rapi.</li>
          </ul>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isJumlahValid}
        className="w-full py-3.5 bg-gradient-to-r from-primary-dark to-secondary hover:scale-[102%] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
      >
        <Truck className="w-5 h-5" />
        Ajukan Pickup
      </button>
    </div>
  );
}
