"use client";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, ShoppingBasket, Clock } from "lucide-react";
import figure from "@/assets/img/figureKomunitas.png";
import pucuk from "@/assets/img/pucuk.png";
import botol from "@/assets/img/botol.png";
import tas from "@/assets/img/tas.png";



const CommunitySection = () => {
  return (
    <section id="komunitas" className="bg-primary-light py-10 px-4 md:px-8 lg:px-10 relative">
      <div className="flex flex-col max-w-6xl md:flex-row items-center justify-beetween px-4 mx-auto mt-6">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-6xl text-white font-semibold mb-3 md:mb-6">Komunitas <span className="text-primary-dark ">EARTHLINE</span></h2>
          <p className="text-primary-dark mb-4 text-sm md:text-base">Bergabunglah di ruang aman untuk berbagi dan belajar bersama tentang pengelolaan sampah. Di sini, kita saling mendukung demi lingkungan yang lebih bersih dan berkelanjutan.”</p>
          {/* btn */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/komunitas"
              className="inline-flex items-center justify-center px-8 py-2 mb-4 bg-linear-to-r from-primary-dark to-secondary rounded-full text-base lg:text-lg font-semibold text-white hover:scale-105 transition duration-300 cursor-pointer shadow-md group"
            >
              <span>Lihat Komunitas</span>
              <motion.span
                className="ml-2 flex items-center -translate-x-1 group-hover:translate-x-1 transition-all duration-200"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <div className="md:w-1/2 mt-20">
          <img src={figure} alt="Pengrajin Sampah" className="md:w-[60%] mx-auto" />
        </div>
      </div>

      <div className="w-full left-0 bottom-0 absolute h-16 lg:h-24 bg-orange-300 rounded-t-3xl"></div>

      <img src={pucuk} alt="" className="absolute w-20 top-[120px] left-[100px] hidden lg:block lg:left-[500px] animate-bounce"/>
      <img src={botol} alt="" className="absolute w-24 bottom-[15px] right-[200px] md:right-[140px] lg:right-[270px] animate-bounce"/>
      <img src={tas} alt="" className="absolute w-24 bottom-[15px]  right-[50px] md:right-[250px] lg:right-[430px] animate-bounce"/>

    </section>
  );
};

export default CommunitySection;
