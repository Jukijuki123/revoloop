// ─────────────────────────────────────────────────────────────────────────────
// Beranda (Home Page)
// Terdiri dari: Hero, Stats, TentangSection, CaraKerja, Impact, Testimoni, CTA
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Recycle, Globe2 } from "lucide-react";

import TentangSection from "@/components/sections/TentangSection";
import CaraKerjaSection from "@/components/sections/CaraKerjaSection";
import ImpactSection from "@/components/sections/ImpactSection";
import TestimoniSection from "@/components/sections/TestimoniSection";
import ImpactStats from "@/components/ui/ImpactStats";
import RunningWords from "@/components/ui/RunningWords";

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 mt-6 mb-10 px-5">
        {/* Ilustrasi */}
        <motion.div
          className="w-full lg:w-1/2 order-1 lg:order-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="/images/hero_img.svg"
            alt="Ilustrasi tukar sampah"
            className="w-[80%] md:w-[60%] lg:w-[80%] h-auto mx-auto"
          />
        </motion.div>

        {/* Teks */}
        <motion.div
          className="w-full lg:w-1/2 order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-4 text-secondary">
            Ubah Sampah Jadi{" "}
            <span className="text-primary-dark">Rupiah</span>
          </h1>
          <p className="text-base md:text-lg text-abu mb-6">
            REVOLOOP dibuat untuk mempermudah masyarakat dalam mengelola sampah
            secara efektif dan bertanggung jawab serta mengubah sampah menjadi
            sumber manfaat melalui pengelolaan yang tepat.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-block overflow-hidden rounded-3xl transition-all duration-500 group"
            >
              <Link
                href="/trashcash"
                className="relative inline-block w-full h-full bg-primary-dark px-6 py-2 rounded-3xl"
              >
                <span className="relative z-10 flex items-center justify-center text-white font-medium">
                  Tukar Sampah
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>

                <span className="absolute left-0.5 top-0 w-1/2 h-full bg-linear-to-r from-primary-dark to-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-l from-primary-dark to-secondary transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              </Link>
            </motion.div>


            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/tentang"
                className="inline-block w-full h-full text-center justify-center border-2 border-primary-dark px-6 py-2 rounded-3xl text-primary-dark font-medium hover:bg-primary-dark hover:text-white transition"
              >
                Pelajari Lebih Lanjut
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </section>


      {/* section tentang kami */}
      <TentangSection />
      <ImpactSection />
      <RunningWords />
      <CaraKerjaSection />

      {/*  cta buat narik user */}
      <section className="relative bg-primary-light overflow-hidden">
        {/* Subtle top wave divider */}
        {/* <div className="absolute top-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full">
            <path d="M0 40 Q360 0 720 20 Q1080 40 1440 10 L1440 0 L0 0 Z" fill="#ffffff" />
          </svg>
        </div> */}


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* ── Left: Illustration + 3R Badges ──────────────── */}
            <motion.div
              className="flex-1 flex flex-col items-center relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >

              {/* Illustration */}
              <div className="relative w-64 md:w-80 lg:w-72 xl:w-80 h-80 drop-shadow-xl">
                <Image
                  src="/images/superHero.png"
                  alt="Karakter REVOLOOP"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* ── Right: Text & CTA ────────────────────────────── */}
            <motion.div
              className="flex-1 text-center lg:text-left max-w-xl"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-dark leading-tight mb-5">
                Dari Sampah{" "}
                <span className="text-secondary drop-shadow-sm">Jadi Rupiah</span>
              </h2>

              <p className="text-primary-dark/70 text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Kumpulkan sampah dari rumah, pilih lokasi bank sampah terdekat, lalu antar langsung ke tempat tersebut. Setelah ditimbang, kamu akan mendapatkan uang dan Poin Hijau sebagai bentuk apresiasi atas kontribusimu menjaga lingkungan.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/trashcash"
                    className="inline-flex items-center justify-center gap-2.5 bg-linear-to-r from-primary-dark to-secondary hover:scale-[102%] text-white px-8 py-3.5 rounded-full font-bold text-base transition "
                  >
                    <Recycle className="w-5 h-5" /> Ayo Jual Sekarang
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center justify-center gap-2 bg-white/60 hover:bg-white border border-primary-dark/20 text-primary-dark px-8 py-3.5 rounded-full font-bold text-base transition backdrop-blur-sm"
                  >
                    Buat Akun Gratis <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      <TestimoniSection />
    </>
  );

}
