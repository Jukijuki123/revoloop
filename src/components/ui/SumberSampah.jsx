"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";


function AnimatedNumber({ value, suffix = "", duration = 1.5, decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); 
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      onUpdate(latest) {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [value, duration, isInView]);

  return (
    <span ref={ref}>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function SumberSampah() {
  const topStats = [
    { value: 46.31, label: "Sampah Rumah Tangga", aos: "flip-right" },
    { value: 15.67, label: "Sampah Pasar", aos: "flip-left" },
    { value: 14.33, label: "Sampah Perniagaan", aos: "flip-right" },
    { value: 13.77, label: "Sampah Kawasan", aos: "flip-left" },
  ];

  const bottomStats = [
    { value: 4.98, label: "Sampah Perkantoran" },
    { value: 3.45, label: "Sampah Publik" },
    { value: 1.49, label: "Sampah Lainnya" },
  ];

  return (
    <div className="bg-linear-to-b from-[#084734] to-primary-light py-10 flex items-center justify-center">
      <div className="max-w-6xl w-full px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-secondary mb-6 text-center"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-duration="500"
        >
          Sumber Sampah
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* 4 kartu atas */}
          {topStats.map((item) => (
            <div
              key={item.label}
              className="bg-primary-light border-2 border-primary p-4 text-center rounded-md hover:bg-secondary hover:scale-105 transition duration-300 group"
              data-aos={item.aos}
              data-aos-delay="300"
              data-aos-duration="500"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary-dark group-hover:text-white">
                <AnimatedNumber
                  value={item.value}
                  suffix="%"
                  decimals={2}
                  duration={6} 
                />
              </h3>
              <p className="text-primary-dark group-hover:text-white">
                {item.label}
              </p>
            </div>
          ))}

          {/* 3 kartu bawah */}
          <div
            className="col-span-2 md:col-span-4 flex flex-wrap justify-center gap-6 mt-2"
            data-aos="fade-up"
          >
            {bottomStats.map((item) => (
              <div
                key={item.label}
                className="bg-primary-light border-2 border-primary p-4 text-center rounded-md w-full sm:w-[45%] md:w-72 hover:bg-secondary hover:scale-105 transition duration-300 group"
              >
                <h3 className="text-2xl font-bold text-primary-dark group-hover:text-white">
                  <AnimatedNumber
                    value={item.value}
                    suffix="%"
                    decimals={2}
                    duration={3}
                  />
                </h3>
                <p className="text-primary-dark group-hover:text-white">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
