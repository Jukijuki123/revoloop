import React from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/img/hero_img.svg";
import { motion } from "motion/react";
import { Link } from 'react-router-dom';


export default function HeroSection() {
  return (
    <section id="beranda" className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 mt-6 mb-16 px-5">
      <motion.div
        className="w-full lg:w-1/2 order-1 lg:order-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1}}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src={heroImg}
          alt="Hero Image"
          className="w-[80%] md:w-[60%] lg:w-[80%] h-auto rounded-lg mx-auto"
        />
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 order-2 md:order-1"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-7xl font-bold mb-4 text-lime-600">
          Ubah Sampah Jadi{" "}
          <span className="bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Peluang
          </span>
        </h1>

        <p className="text-base md:text-lg text-abu mb-6">
          REVOLOOP dibuat untuk mempermudah masyarakat dalam mengelola sampah
          secara efektif dan bertanggung jawab serta mengubah sampah menjadi
          sumber manfaat melalui pengelolaan yang tepat.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-6">
          {/* Button 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block overflow-hidden rounded-3xl transition-all duration-500 group"
          >
            <Link
              to="/trashcash"
              className="relative inline-block w-full h-full bg-orange-500 px-6 py-2 rounded-3xl"
            >
              <span className="relative z-10 flex items-center justify-center text-white font-medium">
                Tukar Sampah
                <ArrowRight className="ml-2 w-4 h-4" />
              </span>

              <span className="absolute left-0 top-0 w-1/2 h-full bg-linear-to-r from-orange-500 to-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-l from-orange-500 to-yellow-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            </Link>
          </motion.div>

          {/* Button 2 */}
          <motion.a
            href="#tentang"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block overflow-hidden border-2 border-primary-dark px-6 py-2 rounded-3xl transition-all duration-500 group hover:bg-primary-dark"
          >
            <span className="relative z-10 flex items-center justify-center text-primary-dark group-hover:text-white font-medium">
              Pelajari Lebih Lanjut
            </span>

            <span className="absolute left-0 top-0 w-1/2 h-full bg-primary-dark transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="absolute right-0 top-0 w-1/2 h-full bg-primary-dark transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
