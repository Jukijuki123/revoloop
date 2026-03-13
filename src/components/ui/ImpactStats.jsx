"use client";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedNumber } from "./AnimatedNumber";

const stats = [
  { value: 67.29, label: "Sampah tidak terkelola", suffix: "%", decimals: 2 },
  { value: 32.71, label: "Sampah terkelola", suffix: "%", decimals: 2 },
  { value: 36.5, label: "Ton Sampah/Tahun", suffix: " Juta+", decimals: 1 },
  { value: 5000, label: "Pengguna aktif", suffix: "+", decimals: 0 },
];

const StatsSection = () => {
  return (
    <section className="bg-[#084734] py-10 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-primary-light shadow-md rounded-2xl lg:rounded-4xl p-6 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center hover:scale-105 transition-transform duration-300 cursor-pointer group"
              >
                {/* Angka + suffix */}
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl md:text-3xl font-extrabold text-primary-dark group-hover:text-hitam">
                    <AnimatedNumber
                      value={stat.value}
                      duration={5}
                      decimals={stat.decimals}
                    />
                  </span>
                  <span className="text-2xl md:text-3xl font-semibold text-hitam">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-sm md:text-base font-medium text-primary-dark group-hover:text-hitam">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
