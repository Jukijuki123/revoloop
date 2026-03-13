"use client";
import React from "react";
import { motion } from "framer-motion";

import horizontal1Img from "../../assets/img/horizontal1.jpg";
import horizontal2Img from "../../assets/img/horizontal2.jpg";
import verticalImg from "../../assets/img/vertikal.jpg";
import hoverManfaatImg from "../../assets/img/hover-manfaatkan.png";
import hover3RImg from "../../assets/img/hover-3r.png";
import hoverKlasifikasiImg from "../../assets/img/hover-klasifikasi.png";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const EducationSection = () => {
  return (
    <section id="edukasi" className="bg-primary-light py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Judul */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10"
        >
          <motion.h2
            variants={cardVariants}
            className="text-3xl md:text-5xl font-bold text-primary-dark mb-3"
          >
            Dimulai dari <span className="text-lime-600">Kamu</span>
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-green-800 max-w-2xl mx-auto text-sm md:text-base"
          >
            Memulai hidup lebih hijau yang keren dan jadilah masyarakat yang
            bukan hanya menghasilkan sampah, tapi juga mampu memilah, mengelola,
            dan memberi dampak positif bagi lingkungan dan diri sendiri.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
        >
          {/* Card 1 – horizontal */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="relative col-span-2 rounded-2xl overflow-hidden group shadow-md cursor-pointer"
          >
            <img
              src={horizontal1Img}
              alt="Manfaatkan Sampah"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* overlay hover*/}
            <div
              className="pointer-events-none absolute inset-0 bg-[#EBDB5D] p-6 md:p-8 flex flex-col justify-start
                         translate-y-full opacity-0
                         group-hover:translate-y-0 group-hover:opacity-100
                         transition-all duration-500 ease-out"
            >
              <h3 className="mb-4 text-center text-xl md:text-2xl font-bold text-abu">
                Manfaatkan Sampah
              </h3>
              <p className="text-xs md:text-sm text-abu max-w-md">
                Sebagai masyarakat yang bijak mari olah sampah menjadi barang
                berharga karena bijak bukan hanya saat membuang, tapi juga saat
                mengolah sampai jadi barang yang bermanfaat.
              </p>
              <img
                src={hoverManfaatImg}
                alt=""
                className="hidden md:block absolute w-32 h-auto right-3 bottom-3"
              />
            </div>

            <h3 className="absolute bottom-5 left-5 text-2xl font-bold text-white drop-shadow group-hover:opacity-0 transition-opacity duration-300">
              Manfaatkan Sampah
            </h3>
          </motion.div>

          {/* Card 2 – vertikall */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="relative md:row-span-2 rounded-2xl overflow-hidden group shadow-md cursor-pointer"
          >
            <img
              src={verticalImg}
              alt="Kelola 3R"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div
              className="pointer-events-none absolute inset-0 bg-[#79A8A3] p-6 md:p-8 flex flex-col items-center
                         translate-y-full opacity-0
                         group-hover:translate-y-0 group-hover:opacity-100
                         transition-all duration-500 ease-out"
            >
              <h3 className="mb-4 text-center text-xl md:text-2xl font-bold text-white">
                Kelola 3R
              </h3>
              <p className="text-xs md:text-sm text-white text-center max-w-xs z-10">
                Mulai kelola sampah yang bijak dengan menerapkan konsep 3R:
                Reduce, Reuse, dan Recycle.
              </p>
              <img
                src={hover3RImg}
                alt=""
                className="hidden md:block absolute w-40 h-auto bottom-0"
              />
            </div>

            <h3 className="absolute bottom-5 left-5 text-2xl font-bold text-white drop-shadow group-hover:opacity-0 transition-opacity duration-300">
              Kelola 3R
            </h3>
          </motion.div>

          {/* Card 3 – horizontal  */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="relative col-span-2 rounded-2xl overflow-hidden group shadow-md cursor-pointer"
          >
            <img
              src={horizontal2Img}
              alt="Klasifikasi Sampah"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div
              className="pointer-events-none absolute inset-0 bg-[#ABE2F6] p-6 md:p-8 flex flex-col justify-start
                         translate-y-full opacity-0
                         group-hover:translate-y-0 group-hover:opacity-100
                         transition-all duration-500 ease-out"
            >
              <h3 className="mb-4 text-center text-xl md:text-2xl font-bold text-abu">
                Klasifikasi Sampah
              </h3>
              <p className="text-xs md:text-sm text-abu max-w-md">
                Sebagai masyarakat yang bijak saat membuang sampah JANGAN ASAL
                BUANG karena setiap jenis sampah beda penempatannya.
              </p>
              <img
                src={hoverKlasifikasiImg}
                alt=""
                className="hidden md:block absolute w-40 h-auto right-3 bottom-3"
              />
            </div>

            <h3 className="absolute bottom-5 left-5 text-2xl font-bold text-white drop-shadow group-hover:opacity-0 transition-opacity duration-300">
              Klasifikasi Sampah
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
