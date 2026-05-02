// ─────────────────────────────────────────────────────────────────────────────
// Halaman Tentang Kami (/tentang)
// Konten: Header, TentangSection, Panduan Daur Ulang, Stats, FAQ
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { motion } from "framer-motion";
import TentangSection from "@/components/sections/TentangSection";
import FaqSection from "@/components/sections/FaqSection";
import KomunitasSection from "@/components/sections/KomunitasSection";
import { Recycle, Leaf, BookOpen, Users } from "lucide-react";

// Panduan singkat daur ulang (menggantikan EdukasiSection & KomunitasSection)
const panduanDaurUlang = [
  {
    icon: Recycle,
    judul: "Pilah Sampah dari Rumah",
    isi: "Pisahkan sampah organik (sisa makanan) dan anorganik (plastik, kertas, logam) sejak dari dapur agar proses daur ulang lebih efisien.",
  },
  {
    icon: Leaf,
    judul: "Kurangi Penggunaan Plastik",
    isi: "Ganti kantong plastik sekali pakai dengan tas belanja kain. Setiap tahun, 8 juta ton plastik berakhir di lautan kita.",
  },
  {
    icon: BookOpen,
    judul: "Kenali Simbol Daur Ulang",
    isi: "Perhatikan simbol segitiga panah di kemasan. Angka 1–7 menunjukkan jenis plastik dan cara penanganan yang berbeda.",
  },
  {
    icon: Users,
    judul: "Bergabung dengan Komunitas",
    isi: "Ikuti program bank sampah di lingkungan sekitarmu. Bersama kita bisa menciptakan ekosistem pengelolaan sampah yang berkelanjutan.",
  },
];

export default function TentangPage() {
  return (
    <>
      {/* ─── Header ──────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden border-b border-gray-100 py-16 px-4">
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-primary-dark/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -left-10 w-40 h-40 bg-secondary/10 rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <span className="inline-block text-xs font-bold tracking-widest text-primary-dark uppercase bg-primary-dark/8 px-4 py-1.5 rounded-full mb-4">
            Platform Daur Ulang Digital
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Tentang <span className="text-primary-dark">REVOLOOP</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Platform digital yang lahir dari kepedulian terhadap lingkungan.
            Kami percaya sampah bukan akhir, tapi awal dari sesuatu yang bernilai.
          </p>
        </motion.div>
      </section>

      {/* ─── Tentang Section ─────────────────────────────────────── */}
      <TentangSection />

      {/* ─── Panduan Daur Ulang ──────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-primary-dark mb-2">Panduan Daur Ulang</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Langkah kecil dari setiap individu bisa menciptakan dampak besar bagi lingkungan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {panduanDaurUlang.map(({ icon: Icon, judul, isi }, idx) => (
              <motion.div
                key={judul}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition"
              >
                <div className="w-12 h-12 bg-primary-dark/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{judul}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{isi}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <KomunitasSection />

      {/* ─── FAQ Section ──────────────────────────────────────────── */}
      <FaqSection />

    </>
  );
}
