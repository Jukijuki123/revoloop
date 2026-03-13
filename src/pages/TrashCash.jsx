"use client";
import React, { useEffect, useMemo, useState } from "react";
import qrImg from "../assets/img/qrJuki.jpg";
import bgTukarSampah from "../assets/img/BGTukarSampah.png";
import logo from "../assets/img/logoEartLine.svg"; 

const hargaPerKg = {
  Plastik: 5000,
  Kertas: 3000,
  Logam: 15000,
  Kaca: 2000,
  Organik: 1000,
};

const formatTanggal = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getDate()} ${date.toLocaleString("id-ID", {
    month: "long",
  })} ${date.getFullYear()}`;
};

const generateKodeTransaksi = () => {
  const now = new Date();
  const rand = Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0");
  return `TRX-${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now
    .getDate()
    .toString()
    .padStart(2, "0")}-${rand}`;
};

export default function TrashCashPage() {
  const todayStr = useMemo(
    () => new Date().toISOString().split("T")[0],
    []
  );

  const [jenis, setJenis] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [lokasi, setLokasi] = useState("");
  const [tanggal, setTanggal] = useState(todayStr);
  const [waktu, setWaktu] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);
  const [kodeTransaksi, setKodeTransaksi] = useState("");
  const [detail, setDetail] = useState({
    jenis: "",
    jumlah: "",
    lokasi: "",
    jadwal: "",
    harga: "",
  });

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 8; h <= 16; h++) {
      const time = `${h.toString().padStart(2, "0")}:00`;
      slots.push(time);
    }
    return slots;
  }, []);

  useEffect(() => {
    if (new Date(tanggal) < new Date(todayStr)) {
      setTanggal(todayStr);
    }
  }, [tanggal, todayStr]);

  const handleTambah = () => {
    setJumlah((prev) => (Number.isNaN(prev) ? 1 : prev + 1));
  };

  const handleKurang = () => {
    setJumlah((prev) => {
      const val = Number.isNaN(prev) ? 1 : prev;
      return val > 1 ? val - 1 : 1;
    });
  };

  const handleSubmit = () => {
    if (!jenis || !lokasi || !tanggal || !waktu || jumlah < 1) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    const harga = jumlah * (hargaPerKg[jenis] || 0);
    const formattedHarga = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);

    const kode = generateKodeTransaksi();

    setDetail({
      jenis,
      jumlah: `${jumlah} kg`,
      lokasi,
      jadwal: `${formatTanggal(tanggal)} ${waktu}`,
      harga: formattedHarga,
    });
    setKodeTransaksi(kode);
    setPopupOpen(true);
  };

  const handleDownloadQr = () => {
    const link = document.createElement("a");
    link.href = qrImg;
    link.download = `QR_${kodeTransaksi || "EarthLine"}.png`;
    link.click();
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-linear-to-br from-green-50 to-emerald-50 min-h-screen font-['Poppins'] relative">
      {/* Header */}
      <header className="bg-primary-dark text-white shadow-lg z-20 relative">
        <div className="mx-auto px-4 py-4 flex items-center">
          <button
            onClick={handleBack}
            className="mr-3 cursor-pointer"
            aria-label="Kembali"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Tukar Sampah</h1>
        </div>
      </header>

      <main className="flex items-center justify-start h-[calc(100vh-64px)] px-6 md:px-12">

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm md:w-[400px] p-6 space-y-5 z-20">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Sampah
            </label>
            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-dark"
            >
              <option value="">Pilih jenis sampah</option>
              <option value="Plastik">Plastik</option>
              <option value="Kertas">Kertas</option>
              <option value="Logam">Logam</option>
              <option value="Kaca">Kaca</option>
              <option value="Organik">Organik</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Sampah
            </label>
            <div className="flex items-center justify-between border border-primary-dark rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={handleKurang}
                className="px-4 py-2 bg-gray-100 text-lg text-primary-dark font-semibold hover:bg-gray-200"
              >
                −
              </button>
              <input
                type="number"
                value={jumlah}
                readOnly
                min={1}
                className="w-full text-center py-2 text-primary-dark font-medium focus:outline-none"
              />
              <button
                type="button"
                onClick={handleTambah}
                className="px-4 py-2 bg-gray-100 text-lg text-primary-dark font-semibold hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 text-right mt-1">kg</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lokasi
            </label>
            <select
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-dark"
            >
              <option value="">Pilih lokasi</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Jakarta Timur">Jakarta Timur</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Utara">Jakarta Utara</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jadwal Pengambilan
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">Tanggal</label>
                <input
                  type="date"
                  value={tanggal}
                  min={todayStr}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full bg-gray-100 mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Waktu</label>
                <select
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark"
                >
                  <option value="">Pilih jam</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-8 py-2 bg-linear-to-r from-primary-dark to-secondary rounded-xl text-xl font-semibold text-white hover:scale-105 transition duration-300 cursor-pointer"
          >
            Jual
          </button>
        </div>

        <div className="absolute bottom-0 right-0 z-0 pointer-events-none">
          <img
            src={bgTukarSampah}
            alt="Ilustrasi Tukar Sampah"
            className="w-[600px] h-auto object-contain"
          />
        </div>
      </main>

      {/* Popup sukses */}
      <div
        className={`fixed inset-0 bg-black/50 ${
          popupOpen ? "flex" : "hidden"
        } items-center justify-center p-4 z-50`}
        onClick={() => setPopupOpen(false)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >

          <div className="bg-primary-dark text-white p-6 text-center sticky top-0 z-10 rounded-t-2xl">
            <h2 className="text-xl font-bold">Penukaran Berhasil</h2>
            <p className="text-sm mt-1 opacity-90">
              Terima kasih sudah berpartisipasi
            </p>
            <p className="text-xs opacity-80">
              Tunjukkan QR saat pengambilan
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gray-50">
            {/* QR */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-xl shadow-md border">
                <img
                  src={qrImg}
                  alt="QR"
                  className="w-48 h-48 mx-auto"
                />
                <p className="text-center text-xs text-gray-500 mt-2">
                  Kode:{" "}
                  <span id="kodeTransaksi">{kodeTransaksi}</span>
                </p>
              </div>
            </div>

            {/* Detail */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                Detail Penukaran
              </h3>
              <div className="bg-white rounded-xl p-4 space-y-3 text-sm border">
                <div className="flex justify-between">
                  <span className="text-gray-600">Jenis</span>
                  <span className="font-medium">{detail.jenis}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumlah</span>
                  <span className="font-medium">{detail.jumlah}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lokasi</span>
                  <span className="font-medium">{detail.lokasi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jadwal</span>
                  <span className="font-medium">{detail.jadwal}</span>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="font-semibold">Harga</span>
                  <span className="font-bold text-primary-dark text-lg">
                    {detail.harga}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 sticky bottom-0 flex gap-3 rounded-b-2xl">
            <button
              type="button"
              onClick={handleDownloadQr}
              className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition text-sm"
            >
              Download QR
            </button>
            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              className="flex-1 bg-primary-dark text-white font-bold py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition text-sm"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
