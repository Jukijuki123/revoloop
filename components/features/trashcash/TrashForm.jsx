"use client";

import { hargaPerKg } from "@/data/hargaSampah";
import { Building2 } from "lucide-react";

export default function TrashForm({
  jenis, setJenis,
  jumlah, setJumlah,
  tanggal, setTanggal,
  waktu, setWaktu,
  timeSlots = [],
  handleSubmit,
  selectedBank,
  onChangeLocation
}) {
  const todayStr = new Date().toISOString().split("T")[0];
  const estimasiHarga = jenis && jumlah ? jumlah * (hargaPerKg[jenis] || 0) : 0;
  const formatRupiah = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 md:p-6 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Lokasi Drop-off */}
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-1.5 flex justify-between">
          Lokasi Bank Sampah
          <button type="button" onClick={onChangeLocation} className="text-primary-dark hover:text-green-700 text-xs font-semibold">Ubah</button>
        </label>
        <div className="relative">
          <input type="text" value={selectedBank?.nama || ""} readOnly className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none" />
          <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
        <label className="block text-sm font-bold text-gray-800 mb-1.5">Estimasi Berat (kg)</label>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden w-full transition focus-within:border-primary-dark focus-within:ring-1 focus-within:ring-primary-dark">
          <button type="button" onClick={() => setJumlah((prev) => Math.max(1, Number(prev) - 1))} className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-primary-dark text-2xl font-bold hover:bg-green-50 transition">−</button>
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
          <button type="button" onClick={() => setJumlah((prev) => (prev ? Number(prev) + 1 : 1))} className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-primary-dark text-2xl font-bold hover:bg-green-50 transition">+</button>
        </div>
        
        {estimasiHarga > 0 && (
          <div className="mt-2 text-sm font-medium flex justify-between items-center bg-green-50 px-3 py-2 rounded-lg border border-green-100">
            <span className="text-green-800">Estimasi Koin Didapat</span>
            <span className="text-primary-dark font-bold">~ {formatRupiah(estimasiHarga)}</span>
          </div>
        )}
      </div>

      {/* Jadwal Antar */}
      <div>
        <label className="block text-sm font-bold text-gray-800 mb-1.5">Jadwal Pengantaran</label>
        <div className="grid grid-cols-2 gap-3">
          <input type="date" value={tanggal} min={todayStr} onChange={(e) => setTanggal(e.target.value)} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:bg-white transition" />
          <select value={waktu} onChange={(e) => setWaktu(e.target.value)} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:bg-white transition appearance-none">
            <option value="">Jam</option>
            {timeSlots.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
      </div>

      <button 
        type="button" 
        onClick={handleSubmit} 
        className="w-full py-3.5 bg-gradient-to-r from-primary-dark to-secondary hover:from-green-800 hover:to-yellow-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
      >
        Konfirmasi Drop-off
      </button>
    </div>
  );
}
