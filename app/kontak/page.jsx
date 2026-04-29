// ─────────────────────────────────────────────────────────────────────────────
// Halaman Kontak (/kontak)
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import KontakSection from "@/components/sections/KontakSection";

export default function KontakPage() {
  return (
    <>
      {/* ─── Header ──────────────────────────────────────────────── */}
      <section className="relative bg-primary-dark overflow-hidden py-20 px-4">
        {/* Dekorasi blob */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/15 border border-white/20 rounded-2xl mb-5">
            <Mail className="w-7 h-7 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Hubungi <span className="text-secondary">Kami</span>
          </h1>
          <p className="text-green-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Punya pertanyaan atau ingin bekerja sama? Jangan ragu untuk
            menghubungi tim REVOLOOP — kami siap membantu.
          </p>
        </motion.div>
      </section>

      {/* ─── Kontak Section ──────────────────────────────────────── */}
      <KontakSection />
    </>
  );
}
