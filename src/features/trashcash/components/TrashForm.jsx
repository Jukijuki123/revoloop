import bgTukarSampah from "@/assets/img/BGTukarSampah.png"

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

    return (
        <div className="bg-green-50 min-h-screen  flex flex-col">

            {/* Header */}
            <header className="bg-primary-dark text-white px-5 py-4 flex z-20 relative items-center gap-3">
                <button
                    type="button"
                    onClick={onChangeLocation}
                    className="cursor-pointer"
                    aria-label="Kembali"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-bold">Tukar Sampah</h1>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-start justify-start px-10 py-10 relative overflow-hidden">

                {/* Form card */}
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 space-y-5 z-10 relative">

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
                        <div className="flex items-center border border-green-800 rounded-xl overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setJumlah(jumlah > 1 ? jumlah - 1 : 1)}
                                className="px-4 py-2.5 text-green-800 text-lg font-bold hover:bg-gray-100 transition"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                value={jumlah}
                                readOnly
                                min={1}
                                className="flex-1 text-center py-2.5 text-gray-800 font-medium focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setJumlah(jumlah + 1)}
                                className="px-4 py-2.5 text-green-800 text-lg font-bold hover:bg-gray-100 transition"
                            >
                                +
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 text-right mt-1">kg</p>
                    </div>

                    {/* Lokasi — otomatis dari selectedBank + tombol Ganti */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">
                            Lokasi
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={selectedBank?.nama || ""}
                                readOnly
                                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-gray-700 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Jadwal Pengambilan */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            Jadwal Pengambilan
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Tanggal</label>
                                <input
                                    type="date"
                                    value={tanggal}
                                    min={todayStr}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    className="w-full bg-gray-100 px-3 py-2.5 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Waktu</label>
                                <select
                                    value={waktu}
                                    onChange={(e) => setWaktu(e.target.value)}
                                    className="w-full px-3 py-2.5 bg-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                                >
                                    <option value="">Pilih jam</option>
                                    {timeSlots.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Jual */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full px-8 py-2 bg-linear-to-r from-primary-dark to-secondary rounded-xl text-xl font-semibold text-white hover:scale-105 transition duration-300 cursor-pointer"
                            >
                        Jual
                    </button>
                </div>

                {/* Background ilustrasi kanan bawah */}
                <div className="absolute bottom-0 right-0 pointer-events-none z-0">
                    <img
                        src={bgTukarSampah}
                        alt="Ilustrasi Tukar Sampah"
                        className="w-[700px] h-auto object-contain"
                    />
                </div>
            </main>
        </div>
    );
}