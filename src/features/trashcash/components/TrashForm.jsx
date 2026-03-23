import bgTukarSampah from "@/assets/img/BGTukarSampah.png";

const hargaPerKg = {
  Plastik: 5000,
  Kertas: 3000,
  Logam: 15000,
  Kaca: 2000,
  Organik: 1000,
};

export default function TrashForm({
  jenis,
  setJenis,
  jumlah,
  setJumlah,
  tanggal,
  setTanggal,
  waktu,
  setWaktu,
  timeSlots = [],
  handleSubmit,
  selectedBank,
  onChangeLocation,
}) {
  const todayStr = new Date().toISOString().split("T")[0];

  const estimasiHarga =
  jenis && jumlah
    ? jumlah * (hargaPerKg[jenis] || 0)
    : 0;

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);



  return (
    <div className="bg-green-50 min-h-[100dvh] flex flex-col">

      {/* Header */}
      <header className="bg-primary-dark text-white px-4 md:px-6 py-4 flex items-center gap-3 relative z-20">
        <button
          type="button"
          onClick={onChangeLocation}
          className="cursor-pointer"
          aria-label="Kembali"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h1 className="text-base md:text-lg font-bold">
          Tukar Sampah
        </h1>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center md:items-start md:justify-start px-4 md:px-10 py-8 md:py-10 relative overflow-hidden">
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm md:max-w-md p-5 md:p-6 space-y-5 relative z-10">
          {/* Jenis Sampah */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Jenis Sampah
            </label>

            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="">Pilih jenis sampah</option>
              <option value="Plastik">Plastik</option>
              <option value="Kertas">Kertas</option>
              <option value="Logam">Logam</option>
              <option value="Kaca">Kaca</option>
              <option value="Organik">Organik</option>
            </select>

          </div>

          {/* Jumlah Sampah */}
          <div>

            <label className="block text-sm font-medium text-gray-800 mb-1">
              Jumlah Sampah
            </label>
            <div className="flex items-center border border-green-800 rounded-xl overflow-hidden w-full">
              {/* Tombol Minus */}
              <button
                type="button"
                onClick={() => setJumlah((prev) => Math.max(1, Number(prev) - 1))}
                className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-green-800 text-xl font-bold hover:bg-gray-100 transition"
              >
                −
              </button>

              {/* Input */}
              <input
                type="number"
                value={jumlah}
                min={1}
                inputMode="numeric"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setJumlah("");
                    return;
                  }
                  const num = Number(value);
                  if (!Number.isNaN(num) && num >= 1) {
                    setJumlah(num);
                  }
                }}
                onBlur={() => {
                  if (!jumlah || jumlah < 1) {
                    setJumlah(1);
                  }
                }}
                className="flex-1 min-w-0 text-center h-11 text-gray-800 font-medium focus:outline-none appearance-none"
              />

              {/* Tombol Plus */}
              <button
                type="button"
                onClick={() => setJumlah((prev) => (prev ? Number(prev) + 1 : 1))}
                className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-green-800 text-xl font-bold hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            <p className="text-xs text-gray-400 text-right mt-1">
              kg
            </p>

            {estimasiHarga > 0 && (
              <div className="mt-2 text-sm text-green-700 font-medium flex justify-between items-center">
                <span>Estimasi Harga</span>
                <span>{formatRupiah(estimasiHarga)}</span>
              </div>
            )}
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Lokasi
            </label>

            <input
              type="text"
              value={selectedBank?.nama || ""}
              readOnly
              className="w-full px-4 py-2.5 bg-gray-100 rounded-xl text-gray-700 focus:outline-none"
            />
          </div>

          {/* Jadwal */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Jadwal Pengambilan
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Tanggal
                </label>

                <input
                  type="date"
                  value={tanggal}
                  min={todayStr}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full bg-gray-100 px-3 py-2.5 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Waktu
                </label>
                <select
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
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

          {/* Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-linear-to-r from-primary-dark to-secondary rounded-xl text-lg md:text-xl font-semibold text-white hover:scale-[102%] transition duration-300 cursor-pointer"
          >
            Jual
          </button>

        </div>

        <div className="absolute bottom-0 right-0 z-0 pointer-events-none">

          <img
            src={bgTukarSampah}
            alt="Ilustrasi Tukar Sampah"
            className="w-[500px] md:w-[650px] h-auto object-contain"
          />

        </div>

      </main>

    </div>
  );
}