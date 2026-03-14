"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import imgR from "@/assets/img/inisial-R.jpeg";
import imgJ from "@/assets/img/inisial-J.jpeg";
import imgF from "@/assets/img/inisial-F.jpg";

const testimonials = [
  {
    id: 1,
    color: "blue",
    bgLight: "bg-blue-100",
    bgSoft: "bg-blue-400/50",
    quote: "Keren banget buat platform edukasi lingkungan! Bikin masyarakat makin sadar dan peduli soal cara mengelola sampah modern juga bagus. Fiturnya mudah diakses.",
    name: "Davina Kemery",
    username: "davina23@gmail.com",
    img: imgR,
  },
  {
    id: 2,
    color: "purple",
    bgLight: "bg-purple-100",
    bgSoft: "bg-purple-400/50",
    quote: "Suka banget sama tampilannya yang simple tapi informatif. Aku jadi tahu bagaimana sampah itu bisa dikelola dengan benar. Sekarang gak bingung buang sampah lagi!",
    name: "Jefri Nichol",
    username: "bangjefri@gmail.com",
    img: imgJ,
  },
  {
    id: 3,
    color: "yellow",
    bgLight: "bg-yellow-100",
    bgSoft: "bg-yellow-400/50",
    quote: "Platform ini membantu banget! Sekarang saya bisa memilah sampah dengan benar, dan rumah terasa lebih bersih setiap hari. keren dah pokoknya sangat membantu.",
    name: "Sulasttri Dwi",
    username: "sulasttri7@gmail.com",
    img: imgF,
  },
  {
    id: 4,
    color: "red",
    bgLight: "bg-red-100",
    bgSoft: "bg-red-400/50",
    quote: "Belajarnya asik banget, tampilannya menarik dan gampang dipahami. Sekarang jadi lebih peduli buat jaga kebersihan rumah dan lingkungan!",
    name: "Rio Johan",
    username: "johanrrr@gmail.com",
    img: imgJ,
  },
  {
    id: 5,
    color: "teal",
    bgLight: "bg-teal-100",
    bgSoft: "bg-teal-400/50",
    quote: "Anak-anak di sekolah jadi lebih semangat belajar dan peduli terhadap daur ulang berkat platform ini. Keren dan gampang diimplementasikan ke anak-anak.",
    name: "Kharisma",
    username: "khakharisma@gmail.com",
    img: imgR,
  },
  {
    id: 6,
    color: "orange",
    bgLight: "bg-orange-100",
    bgSoft: "bg-orange-400/50",
    quote: "Platform ini sangat membantu meningkatkan kesadaran lingkungan masyarakat dengan fitur jelas, dan konten yang mudah dipahami.",
    name: "Al Rasyid",
    username: "sidalrasyid@gmail.com",
    img: imgR,
  },
];

export default function TestimoniSection() {
  return (
    <section id='testimoni' className="bg-white py-10 px-4">

      <motion.div
        className="flex flex-col md:flex-row max-w-6xl mb-10 mx-auto pb-3 px-4 justify-between border-b-2 border-primary-dark"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-dark text-center mb-6">
            Apa Kata Mereka{" "}
            <span className="text-secondary">Tentang REVOLOOP?</span>
          </h2>
        </div>

        <div className="md:w-1/2 ">
          <p className="text-primary-dark text-sm md:text-base md:text-center">
            Kami memahami bahwa setiap orang memiliki cara berbeda dalam mengelola sampah. Melalui pengalaman kami, REVOLOOP telah membantu banyak masyarakat mengelola sampah dengan lebih mudah, bermanfaat, dan berkelanjutan.
          </p>
        </div>
      </motion.div>

      {/* Testimonial Cards */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`pb-1 ${item.bgSoft} rounded-2xl hover:pb-3 transition-all duration-300 w-full md:w-64 lg:w-72 mx-auto`}
          >
            <div
              className={`${item.bgLight} p-6 rounded-2xl shadow-md hover:shadow-xl transition`}
            >
              <Quote
                className={`text-${item.color}-500 text-3xl mb-3`}
                strokeWidth={2}
              />
              <p className="text-green-900 mb-6">{item.quote}</p>

              <div className="mt-3 text-yellow-400">★★★★★</div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-green-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.username}</p>
                </div>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
