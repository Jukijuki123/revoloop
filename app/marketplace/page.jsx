"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Coins, Search, CheckCircle, XCircle, AlertCircle, X, Loader2, Star, Package, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const dummyProducts = [
  { id: 1, name: "Tas Anyaman Plastik Kopi", price: 35000, coins: 350, category: "Aksesoris", image: "/images/tasPlastik.jpeg", desc: "Tas unik dan kuat yang dianyam dari sisa kemasan kopi sachet. Cocok untuk belanja atau jalan-jalan santai.", seller: "UKM Jaya Mandiri", rating: 4.8, sold: 124 },
  { id: 2, name: "Jam Dinding Stik Es Krim", price: 45000, coins: 450, category: "Dekorasi", image: "/images/jamDinding.jpg", desc: "Jam dinding estetik bergaya minimalis yang dirangkai dari stik es krim bekas yang telah disterilkan.", seller: "Kreasi Nusantara", rating: 4.6, sold: 89 },
  { id: 3, name: "Lampu Hias Botol Kaca", price: 75000, coins: 750, category: "Dekorasi", image: "/images/eduPemilhanSampah.jpg", desc: "Lampu tidur gantung dari botol kaca bekas sirup, dilengkapi lampu LED warm-white.", seller: "Rumah Daur Ulang", rating: 4.9, sold: 212 },
  { id: 4, name: "Pot Tanaman Ban Bekas", price: 60000, coins: 600, category: "Perlengkapan Rumah", image: "/images/horizontal1.jpg", desc: "Ban bekas yang disulap menjadi pot tanaman gantung dengan cat warna-warni cerah.", seller: "Green Life Studio", rating: 4.7, sold: 67 },
  { id: 5, name: "Dompet Resleting Botol", price: 15000, coins: 150, category: "Aksesoris", image: "/images/eduSampahJadiCuan.jpg", desc: "Dompet koin mungil yang terbuat dari dua pangkal botol plastik air mineral.", seller: "UKM Jaya Mandiri", rating: 4.5, sold: 301 },
  { id: 6, name: "Tatakan Gelas Kain Perca", price: 20000, coins: 200, category: "Perlengkapan Rumah", image: "/images/horizontal2.jpg", desc: "Satu set tatakan gelas (4 pcs) yang dijahit dari limbah kain perca sisa konveksi.", seller: "Kreasi Nusantara", rating: 4.4, sold: 178 },
];

// Toast component
function Toast({ toast, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 5000); return () => clearTimeout(t); }, [onClose]);
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

// Purchase success card
function SuccessCard({ result, product, onClose }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-sm text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">Pembelian Berhasil!</h3>
      <p className="text-sm text-gray-500 mb-5">Kode Pesanan: <span className="font-mono font-bold text-primary-dark">{result.kode}</span></p>

      <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-3 mb-5">
        <div className="flex items-center gap-3">
          <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-900 text-sm leading-tight">{product.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{product.seller}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Metode Bayar</span>
            <span className="font-semibold text-gray-800">
              {result.paymentMethod === "coins" ? `${product.coins} Poin Hijau` : `Rp ${product.price.toLocaleString("id-ID")}`}
            </span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-500 flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Estimasi Tiba</span>
            <span className="font-bold text-primary-dark">{result.estimasiTiba}</span>
          </div>
          {result.paymentMethod === "cash" && (
            <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-800">
              ⚠️ Tim kami akan menghubungi kamu via WhatsApp untuk konfirmasi pembayaran.
            </div>
          )}
          {result.paymentMethod === "coins" && result.remainingCoins !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Sisa Koin</span>
              <span className="font-bold text-yellow-600 flex items-center gap-1"><Coins className="w-3.5 h-3.5" />{result.remainingCoins}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <a href="/riwayat" className="flex-1 py-2.5 border-2 border-primary-dark text-primary-dark font-semibold rounded-xl hover:bg-primary-dark hover:text-white transition text-sm text-center">
          Lihat Riwayat
        </a>
        <button onClick={onClose} className="flex-1 py-2.5 bg-primary-dark text-white font-semibold rounded-xl hover:bg-green-800 transition text-sm">
          Lanjut Belanja
        </button>
      </div>
    </motion.div>
  );
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Semua");
  const [buyingMode, setBuyingMode] = useState(null);     // product selected
  const [confirmStep, setConfirmStep] = useState(false);  // step 2: confirmation
  const [chosenMethod, setChosenMethod] = useState(null); // "coins" | "cash"
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState(null); // success result
  const [userCoins, setUserCoins] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user) { setIsLoggedIn(true); setUserCoins(data.user.poinHijau); }
        }
      } catch (e) { console.error(e); }
    };
    fetchUser();
    const handler = () => fetchUser();
    window.addEventListener("user-updated", handler);
    return () => window.removeEventListener("user-updated", handler);
  }, []);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const handleOpenModal = (product) => {
    if (!isLoggedIn) { addToast("Silakan login terlebih dahulu untuk membeli produk.", "error"); return; }
    setBuyingMode(product);
    setConfirmStep(false);
    setChosenMethod(null);
  };

  const handleCloseModal = () => {
    setBuyingMode(null);
    setConfirmStep(false);
    setChosenMethod(null);
    setPurchaseResult(null);
  };

  const handleSelectMethod = (method) => {
    if (method === "coins" && userCoins < buyingMode.coins) {
      addToast(`Poin Hijau tidak cukup! Saldo: ${userCoins} koin, dibutuhkan: ${buyingMode.coins} koin.`, "error");
      return;
    }
    setChosenMethod(method);
    setConfirmStep(true); // move to confirmation step
  };

  const handleConfirmPurchase = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/pembelian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: buyingMode.id,
          productName: buyingMode.name,
          coins: buyingMode.coins,
          price: buyingMode.price,
          paymentMethod: chosenMethod,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        if (chosenMethod === "coins") {
          setUserCoins(data.remainingCoins);
          window.dispatchEvent(new Event("user-updated"));
        }
        setConfirmStep(false);
        setPurchaseResult(data);
      } else {
        addToast(data.error || "Pembelian gagal. Coba lagi.", "error");
      }
    } catch (e) {
      addToast("Terjadi kesalahan jaringan.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // logic filter produk: cari dari search bar atau kategori tab
  const filteredProducts = dummyProducts.filter((p) => {
    return p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "Semua" || p.category === category);
  });
  const categories = ["Semua", "Aksesoris", "Dekorasi", "Perlengkapan Rumah"];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-9999 flex flex-col gap-3 items-end">
        <AnimatePresence>{toasts.map((t) => <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />)}</AnimatePresence>
      </div>

      {/* ─── Header ─────────────────────────────────────────────────── */}
      <section className="relative bg-primary-dark overflow-hidden py-16 px-4">
        {/* Decorative shapes */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary/10 rounded-full -translate-x-1/3 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/25 text-secondary px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            <ShoppingBag className="w-3.5 h-3.5" /> Produk Daur Ulang
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
            REVOLOOP <span className="text-secondary">Marketplace</span>
          </h1>
          <p className="text-green-100 text-sm md:text-base max-w-xl leading-relaxed mb-5">
            Tukarkan Poin Hijau atau beli langsung berbagai produk kerajinan tangan hasil daur ulang yang unik dan ramah lingkungan.
          </p>

          {/* Coin badge + riwayat link */}
          {isLoggedIn && userCoins !== null ? (
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-full">
                <Coins className="w-4 h-4 text-secondary" />
                <span className="text-white font-bold text-sm">Poin Hijau:</span>
                <span className="text-secondary font-extrabold">{userCoins.toLocaleString("id-ID")} koin</span>
              </div>
              <a href="/riwayat" className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition">
                Riwayat <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : !isLoggedIn && (
            <a href="/auth/login" className="inline-flex items-center gap-2 bg-secondary hover:bg-yellow-500 text-white px-5 py-2.5 rounded-full font-semibold transition shadow">
              Login untuk lihat saldo koin →
            </a>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        {/* Filter & Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${category === cat ? "bg-primary-dark text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <input type="text" placeholder="Cari produk..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-dark focus:bg-white transition" />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product, idx) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-dark shadow-sm">{product.category}</div>
                  <div className="absolute top-3 right-3 bg-yellow-400/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-yellow-900 shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-700" /> {product.rating}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-gray-400 mb-1">{product.seller}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-1">{product.desc}</p>
                  <p className="text-xs text-gray-400 mb-4">{product.sold} terjual</p>
                  <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-xl p-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Harga Uang</span>
                      <span className="text-base font-bold text-gray-900">Rp {product.price.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="h-8 w-px bg-gray-200 mx-2"></div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400">Pakai Koin</span>
                      <span className="text-base font-bold text-yellow-600 flex items-center gap-1"><Coins className="w-4 h-4" /> {product.coins}</span>
                    </div>
                  </div>
                  <button onClick={() => handleOpenModal(product)}
                    className="w-full py-2.5 bg-primary-dark text-white font-semibold rounded-xl hover:bg-secondary transition shadow-sm flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" /> Beli Sekarang
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag className="mx-auto mb-4 w-16 h-16 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-700">Produk tidak ditemukan</h3>
            <p className="text-gray-500 mt-2">Coba kata kunci lain.</p>
          </div>
        )}
      </main>

      {/* Modal Overlay */}
      <AnimatePresence>
        {(buyingMode && !purchaseResult) && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            {!confirmStep ? (
              // STEP 1: Choose Payment Method
              <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }} transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-sm">
                <div className="flex gap-4 mb-6 pb-5 border-b border-gray-100">
                  <img src={buyingMode.image} alt={buyingMode.name} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{buyingMode.seller}</p>
                    <h3 className="font-bold text-gray-900 leading-tight">{buyingMode.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{buyingMode.desc}</p>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Pilih Metode Pembayaran</h4>
                <div className="space-y-3 mb-5">
                  <button onClick={() => handleSelectMethod("coins")}
                    disabled={userCoins < buyingMode.coins}
                    className={`w-full p-4 border-2 rounded-xl flex items-center justify-between transition disabled:opacity-50 disabled:cursor-not-allowed ${userCoins >= buyingMode.coins ? "border-yellow-400 bg-yellow-50 hover:bg-yellow-100" : "border-gray-200 bg-gray-50"}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 flex-shrink-0"><Coins className="w-5 h-5" /></div>
                      <div className="text-left">
                        <p className="font-bold text-gray-900">Poin Hijau</p>
                        <p className="text-xs text-gray-500">Saldo: {userCoins?.toLocaleString("id-ID")} koin</p>
                      </div>
                    </div>
                    <span className="font-bold text-yellow-700">{buyingMode.coins} koin</span>
                  </button>
                  <button onClick={() => handleSelectMethod("cash")}
                    className="w-full p-4 border border-gray-200 rounded-xl flex items-center justify-between hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 flex-shrink-0"><span className="font-bold text-sm">Rp</span></div>
                      <div className="text-left">
                        <p className="font-bold text-gray-900">Transfer / E-Wallet</p>
                        <p className="text-xs text-gray-500">BCA, Mandiri, GoPay, OVO</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">Rp {buyingMode.price.toLocaleString("id-ID")}</span>
                  </button>
                </div>
                <button onClick={handleCloseModal} className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition">Batal</button>
              </motion.div>
            ) : (
              // STEP 2: Konfirmasi akhir
              <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }} transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-1">Cek dulu nih!</h4>
                <p className="text-sm text-gray-500 mb-5">Pastikan detail belanjaan kamu udah bener ya.</p>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mb-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                    <img src={buyingMode.image} alt={buyingMode.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{buyingMode.name}</p>
                      <p className="text-xs text-gray-500">{buyingMode.seller}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Metode Bayar</span>
                    <span className="font-semibold text-gray-800">{chosenMethod === "coins" ? "Poin Hijau" : "Transfer / E-Wallet"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Harga</span>
                    <span className="font-bold text-gray-900">{chosenMethod === "coins" ? `${buyingMode.coins} koin` : `Rp ${buyingMode.price.toLocaleString("id-ID")}`}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center pt-1 border-t border-gray-200">
                    <span className="text-gray-500 flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Sampainya</span>
                    <span className="font-bold text-primary-dark">3–5 Hari Kerja</span>
                  </div>
                </div>
                {/* ringkasan buat liat total koin */}
                <div className="flex gap-3">
                  <button onClick={() => setConfirmStep(false)} disabled={isLoading}
                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition disabled:opacity-50 text-sm">
                    Kembali
                  </button>
                  <button onClick={handleConfirmPurchase} disabled={isLoading}
                    className="flex-1 py-3 bg-primary-dark text-white font-bold rounded-xl hover:bg-green-800 transition disabled:opacity-70 flex items-center justify-center gap-2 text-sm">
                    {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</> : "Ya, Beli Sekarang!"}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Success Result Card */}
        {purchaseResult && buyingMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <SuccessCard result={purchaseResult} product={buyingMode} onClose={handleCloseModal} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
