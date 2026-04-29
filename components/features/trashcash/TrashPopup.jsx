"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function TrashPopup({ popupOpen, setPopupOpen, kodeTransaksi, detail }) {
  if (!popupOpen) return null;

  const handleDownloadQR = () => {
    const canvas = document.querySelector("#qr-canvas canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `QR_${kodeTransaksi}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setPopupOpen(false)}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-primary-dark text-white px-6 py-5 text-center rounded-t-2xl">
          <h2 className="text-xl font-bold">Penukaran Berhasil</h2>
          <p className="text-sm mt-1 opacity-90">Terima kasih sudah berpartisipasi</p>
          <p className="text-xs opacity-80">Tunjukkan QR saat pengambilan</p>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 bg-white">
          <div className="flex justify-center">
            <div id="qr-canvas" className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col items-center">
              <QRCodeCanvas value={kodeTransaksi} size={180} />
              <p className="text-xs text-gray-400 mt-3">Kode: <span className="text-gray-600">{kodeTransaksi}</span></p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-base">Detail Penukaran</h3>
            <div className="border border-gray-200 rounded-2xl px-5 py-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Jenis</span><span className="font-medium text-gray-800">{detail.jenis}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Jumlah</span><span className="font-medium text-gray-800">{detail.jumlah}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Lokasi</span><span className="font-medium text-gray-800">{detail.lokasi}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Jadwal</span><span className="font-medium text-gray-800">{detail.jadwal}</span></div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center"><span className="font-bold text-gray-900">Harga</span><span className="font-bold text-green-700 text-base">{detail.harga}</span></div>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 bg-white border-t border-gray-100 flex gap-3 rounded-b-2xl">
          <button type="button" onClick={handleDownloadQR} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition text-sm cursor-pointer">Download QR</button>
          <button type="button" onClick={() => setPopupOpen(false)} className="flex-1 bg-primary-dark hover:bg-green-950 text-white font-semibold py-3 rounded-xl transition text-sm cursor-pointer">Kembali</button>
        </div>
      </div>
    </div>
  );
}
