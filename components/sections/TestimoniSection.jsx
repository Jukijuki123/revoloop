"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  { id: 1, quote: "Keren banget buat platform edukasi lingkungan! Bikin masyarakat makin sadar dan peduli soal cara mengelola sampah modern juga bagus. Fiturnya mudah diakses.", name: "Davina Kemery", username: "davina23@gmail.com", img: "/images/inisial-R.jpeg" },
  { id: 2, quote: "Suka banget sama tampilannya yang simple tapi informatif. Aku jadi tahu bagaimana sampah itu bisa dikelola dengan benar. Sekarang gak bingung buang sampah lagi!", name: "Jefri Nichol", username: "bangjefri@gmail.com", img: "/images/inisial-J.jpeg" },
  { id: 3, quote: "Platform ini membantu banget! Sekarang saya bisa memilah sampah dengan benar, dan rumah terasa lebih bersih setiap hari. keren dah pokoknya sangat membantu.", name: "Sulasttri Dwi", username: "sulasttri7@gmail.com", img: "/images/inisial-F.jpg" },
  { id: 4, quote: "Belajarnya asik banget, tampilannya menarik dan gampang dipahami. Sekarang jadi lebih peduli buat jaga kebersihan rumah dan lingkungan!", name: "Rio Johan", username: "johanrrr@gmail.com", img: "/images/inisial-J.jpeg" },
  { id: 5, quote: "Anak-anak di sekolah jadi lebih semangat belajar dan peduli terhadap daur ulang berkat platform ini. Keren dan gampang diimplementasikan ke anak-anak.", name: "Kharisma", username: "khakharisma@gmail.com", img: "/images/inisial-R.jpeg" },
  { id: 6, quote: "Platform ini sangat membantu meningkatkan kesadaran lingkungan masyarakat dengan fitur jelas, dan konten yang mudah dipahami.", name: "Al Rasyid", username: "sidalrasyid@gmail.com", img: "/images/inisial-R.jpeg" },
];

export default function TestimoniSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const getVisibleTestimonials = () => {
    return testimonials.slice(currentIndex, currentIndex + itemsPerPage);
  };

  return (
    <section id="testimoni" className="bg-[#fafafa] py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-primary-dark text-center mb-12 uppercase tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Testimoni
        </motion.h2>

        <div className="flex items-center justify-center gap-2 md:gap-6 relative">

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="hidden md:flex shrink-0 w-12 h-12 items-center justify-center text-primary-dark hover:text-primary transition"
          >
            <ChevronLeft className="w-10 h-10" strokeWidth={3} />
          </button>

          {/* Cards Container */}
          <div className="flex gap-6 overflow-hidden w-full px-2 py-4">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 min-w-0 bg-white border border-primary-dark rounded-lg p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div className="shrink-0">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-gray-100">
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1">
                    <p className="text-gray-700 text-sm md:text-base italic leading-relaxed mb-6">
                      "{item.quote}"
                    </p>
                    <div className="mt-auto">
                      <h4 className="font-bold text-primary-dark uppercase tracking-wide text-sm md:text-base">
                        {item.name}
                      </h4>
                      <p className="text-gray-400 text-xs md:text-sm italic">
                        {item.username}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="hidden md:flex shrink-0 w-12 h-12 items-center justify-center text-primary-dark hover:text-primary transition"
          >
            <ChevronRight className="w-10 h-10" strokeWidth={3} />
          </button>

        </div>

        {/* Mobile Nav & Dots */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex md:hidden gap-8">
            <button onClick={handlePrev} className="text-primary-dark hover:text-primary">
              <ChevronLeft className="w-8 h-8" strokeWidth={3} />
            </button>
            <button onClick={handleNext} className="text-primary-dark hover:text-primary">
              <ChevronRight className="w-8 h-8" strokeWidth={3} />
            </button>
          </div>

          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === idx ? "bg-primary-dark w-6" : "bg-primary/25 hover:bg-primary-light"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
