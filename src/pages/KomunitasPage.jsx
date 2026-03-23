"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";


import komunitas1Img from "../assets/img/komunitas1.png";
import komunitas2Img from "../assets/img/komunitas2.png";
import komunitas3Img from "../assets/img/komunitas3.png";

const communities = [
  {
    id: 1,
    title: "Sampah Bernilai Hub",
    description:
      "Komunitas seru tempat kita belajar cara nyulap sampah jadi cuan. Di sini, yang dibuang bukan cuma mantan—tapi juga sampah yang bisa dijual lagi!",
    image: komunitas1Img,
    link: "https://whatsapp.com/channel/0029Vb7Wmq96LwHpUXQcnU0M",
  },
  {
    id: 2,
    title: "Jago Jual Sampah",
    description:
      "Tempat nongkrongnya para pejuang cuan dari sampah. Kita bareng-bareng belajar cara mindahin sampah dari tong ke dompet!",
    image: komunitas2Img,
    link: "https://whatsapp.com/channel/0029Vb7Wmq96LwHpUXQcnU0M",
  },
  {
    id: 3,
    title: "Tunas Hijau",
    description:
      "Komunitas peduli lingkungan yang fokus pada penghijauan dan edukasi daur ulang. Bersama kita jaga bumi tetap hijau!",
    image: komunitas3Img,
    link: "https://whatsapp.com/channel/0029VaNguYp545v5B9P5880Y",
  },
  {
    id: 4,
    title: "Recycle Rangers",
    description:
      "Komunitas para ranger daur ulang yang aktif berbagi tips, trik, dan inspirasi mengolah sampah menjadi produk bernilai tinggi.",
    image: komunitas2Img,
    link: "https://whatsapp.com/channel/0029VaNguYp545v5B9P5880Y",
  },
];


function ConfirmModal({ community, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-3">
          <ExternalLink className="w-5 h-5 text-primary-dark" />
          <h3 className="font-bold text-primary-dark text-base">Bergabung ke Komunitas</h3>
        </div>

        <p className="text-sm text-gray-600 mb-1">
          Kamu akan diarahkan ke WhatsApp untuk bergabung ke:
        </p>
        <p className="font-semibold text-primary-dark mb-5">
          {community.title}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            Batal
          </button>
          
          <a
            href={community.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-primary-dark text-white text-sm font-semibold text-center hover:bg-green-900 transition cursor-pointer"
          >
            Lanjutkan
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// Card komunitas
function CommunityCard({ community, index, onJoin }) {
  return (
    <motion.div
      key={community.id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-lg w-[360px] sm:w-[420px] md:w-[500px] shrink-0 overflow-hidden"
    >
      <div className="h-52 md:h-64 overflow-hidden">
        <img
          src={community.image}
          alt={community.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-5 py-5 flex flex-col gap-3">
        <h2 className="text-lg md:text-xl font-extrabold text-primary-dark text-center">
          {community.title}
        </h2>
        <p className="text-xs md:text-sm text-gray-500 text-center leading-relaxed">
          {community.description}
        </p>

        <div className="mt-2 flex justify-center">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onJoin(community)}
            className="inline-flex items-center justify-center gap-2 min-w-[130px] bg-linear-to-r from-primary-dark to-secondary rounded-full text-base md:text-lg font-semibold text-white px-8 py-2 shadow-md transition cursor-pointer"
          >
            Gabung
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}


// Komponen utama
const KomunitasPage = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 320;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScrollIndicator = () => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = 360 + 24;

    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary-dark">
      <main className="flex-1">
        <section className="px-4 sm:px-6 md:px-10 lg:px-16 pt-4 pb-20 text-white">

          <header className="bg-primary-dark text-white px-4 md:px-6 py-4 flex items-center gap-3 relative z-20">
            <button
              type="button"
              onClick={handleBack}
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
              Komunitas
            </h1>
          </header>

          {/* Title */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold mt-1"
            >
              Komunitas <span className="text-lime-300">REVOLOOP</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-3 text-sm md:text-base text-gray-100 leading-relaxed"
            >
              Selamat datang di komunitas yang peduli lingkungan. Di sini, kita
              belajar, berbagi, dan bergerak bersama untuk mengelola sampah
              dengan lebih bijak.
            </motion.p>
          </div>

          {communities.length === 0 ? (
            <div className="text-center text-white/60 mt-20">
              <p className="text-lg">Belum ada komunitas tersedia.</p>
              <p className="text-sm mt-1">Coba kembali lagi nanti ya!</p>
            </div>
          ) : (
            <div className="mt-10">
              <p className="text-xs text-white/50 text-right mb-2 sm:hidden">
                Geser untuk lihat lebih banyak →
              </p>

              <div className="overflow-x-auto scroll-smooth no-scrollbar pb-4">
                {/* Button kiri */}
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  className="hidden lg:flex items-center justify-center absolute left-8 xl:left-20 top-1/2 -translate-y-1/2 bg-primary hover:bg-secondary text-white w-10 h-10 rounded-full shadow-md z-20 transition"
                >
                  &#10094;
                </button>

                {/* Button kanan */}
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  className="hidden lg:flex items-center justify-center absolute right-8 xl:right-20 top-1/2 -translate-y-1/2 bg-primary hover:bg-secondary text-white w-10 h-10 rounded-full shadow-md z-20 transition"
                >
                  &#10095;
                </button>

                {/* Scroll container */}
                <div
                  ref={scrollRef}
                  onScroll={handleScrollIndicator}
                  className="max-w-6xl mx-auto overflow-x-auto scroll-smooth no-scrollbar pb-4"
                >
                  <div className="flex flex-nowrap justify-between gap-6 md:gap-8 ">
                    {communities.map((community, index) => (
                      <CommunityCard
                        key={community.id}
                        community={community}
                        index={index}
                        onJoin={setSelectedCommunity}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4">
                {communities.map((c, i) => (
                  <div
                    key={c.id}
                    className={`w-2 h-2 rounded-full transition ${
                      activeIndex === i
                        ? "bg-white scale-125"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <AnimatePresence>
        {selectedCommunity && (
          <ConfirmModal
            community={selectedCommunity}
            onConfirm={() => setSelectedCommunity(null)}
            onCancel={() => setSelectedCommunity(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default KomunitasPage;