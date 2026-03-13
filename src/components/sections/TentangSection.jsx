"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { PiggyBank, BookOpen, Leaf, Smartphone } from "lucide-react";

import imgTentang from "@/assets/img/imgTentang.png";



export default function TentangSection() {

  const stats = [
    { value: 67.29, label: "Sampah tidak terkelola", suffix: "%", decimals: 2 },
    { value: 32.71, label: "Sampah terkelola", suffix: "%", decimals: 2 },
    {
      value: 36.5,
      label: "Ton Sampah/Tahun",
      suffix: " Juta+",
      decimals: 1,
    },
  ];

  return (
    <section id="tentang" className="relative bg-[#084734] py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-16 flex flex-col lg:flex-row items-center gap-8">

        <motion.div
          className="w-full lg:w-1/2 relative order-1 lg:order-2 flex justify-center"
          initial={{ opacity: 0}}
          whileInView={{ opacity: 1}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={imgTentang}
            alt="Tentang EarthLine"
            className="w-[80%] h-auto rounded-lg mx-auto md:ml-auto"
          />


        </motion.div>

        {/* Text */}
        <motion.div
          className="w-full lg:w-1/2 order-2 md:order-1 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold inline-block px-6 py-2 mb-6 rounded-3xl bg-primary-light text-[#084734]">
            Kenali REVOLOOP
          </h2>

          <p className="text-lg mb-4">
            Platform digital untuk mengelola dan menjual sampah daur ulang
            dengan cepat, transparan, dan ramah lingkungan.
          </p>

          <h3 className="text-2xl md:text-3xl font-bold text-primary-light mb-4">
            Yang Kamu Dapat Saat Menggunakan Platform Ini
          </h3>

          <ul className="text-white text-base font-semibold space-y-3">
            <motion.li
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <PiggyBank className="text-primary-light w-6 h-6" />
              Pendapatan Tambahan
            </motion.li>

            <motion.li
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BookOpen className="text-primary-light w-6 h-6" />
              Edukasi Pengelolaan Sampah
            </motion.li>

            <motion.li
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Leaf className="text-primary-light w-6 h-6" />
              Dampak Lingkungan Positif
            </motion.li>

            <motion.li
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Smartphone className="text-primary-light w-6 h-6" />
              Kemudahan Akses Digital
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
