"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";

import kotakTisuImg from "@/assets/img/kotakTisu.jpg";
import tasPlastikImg from "@/assets/img/tasPlastik.jpeg";
import jamDindingImg from "@/assets/img/jamDinding.jpg";
import tempatPensilImg from "@/assets/img/tempatPensil.jpg";
import bungaBotolImg from "@/assets/img/BungaBotol.jpg";

const products = [
  {
    id: 1,
    title: "Tempat Tisu",
    description:
      "Daur ulang tutup botol jadi wadah tisu unik, berwarna-warni, dan ramah lingkungan.",
    image: kotakTisuImg,
    tutorialUrl: "https://share.google/7qqA7moAlj5zCEBKm",
    buyUrl: "https://share.google/0VdKdhObrA6XGpLjL",
  },
  {
    id: 2,
    title: "Tas Plastik",
    description:
      "Anyam kemasan kopi bekas menjadi tas modis, kuat, tahan air, dan bergaya daur ulang.",
    image: tasPlastikImg,
    tutorialUrl: "https://youtu.be/R5qWCpNaBZQ?si=gDttryQC8Y6ooeeg",
    buyUrl:
      "https://www.lazada.co.id/products/tas-dari-bungkus-kopi-i7237004354.html",
  },
  {
    id: 3,
    title: "Jam Dinding",
    description:
      "Susun stik es krim membentuk bingkai jam estetik, kreatif, dan cocok untuk dekorasi ruangan.",
    image: jamDindingImg,
    tutorialUrl: "https://youtu.be/SIzHB6LDbXE?si=EKgMXJUVIO1STMWW",
    buyUrl:
      "https://www.lazada.co.id/products/jam-dinding-stik-eskrim-jam-hexagonal-jam-dinding-kayu-unik-i6941046237.html",
  },
  {
    id: 4,
    title: "Tempat Pensil",
    description:
      "Rakit stik es krim jadi wadah pensil natural, kreatif, dan cocok untuk meja belajar.",
    image: tempatPensilImg,
    tutorialUrl: "https://youtu.be/hGTyqOC3gzk?si=4OFq7UsCCk0R_wTc",
    buyUrl:
      "https://shopee.co.id/product/1028018064/29621333940?d_id=dd6a8&uls_trackid=5466lvej003e&utm_content=GfbvbtUs29CojdHzJ2HY37eFFyR",
  },
  {
    id: 5,
    title: "Bunga Botol Plastik",
    description:
      "Ubah botol bekas jadi bunga cantik berwarna-warni untuk hiasan meja atau vas dekoratif.",
    image: bungaBotolImg,
    tutorialUrl: "https://youtu.be/O-pMu7KzTbY?si=ftY1hyUFpYnFZJ6n",
    buyUrl: "https://id.shp.ee/Pf71VhF",
  },
];

const ProdukKerajinan = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 320; 
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white items-center justify-center pt-16 pb-10 relative">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-2xl md:text-4xl lg:text-5xl text-primary-dark font-bold text-center mb-4"
      >
        Produk <span className="text-secondary">Kerajinan Tangan</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-primary-dark text-center text-sm md:text-base mb-6"
      >
        Terbuat dari sampah yang dimanfaatkan menjadi barang yang memiliki
        nilai jual.
      </motion.p>

    {/* Button Scroll */}
      <button
        type="button"
        onClick={() => handleScroll("left")}
        className="hidden lg:flex items-center justify-center absolute left-8 xl:left-20 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark text-white w-10 h-10 rounded-full shadow-md z-20 transition"
      >
        &#10094;
      </button>

      <button
        type="button"
        onClick={() => handleScroll("right")}
        className="hidden lg:flex items-center justify-center absolute right-8 xl:right-20 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark text-white w-10 h-10 rounded-full shadow-md z-20 transition"
      >
        &#10095;
      </button>

      {/* Container scroll */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto px-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        <div className="flex flex-nowrap gap-6 pb-4">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              className="bg-gray-50 p-4 w-72 h-full rounded-xl shrink-0 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="rounded-xl overflow-hidden mb-4 w-64 h-40 bg-cover mx-auto">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl mb-1 font-semibold">
                  {product.title}
                </h3>
                <p className="text-sm text-abu line-clamp-3">
                  {product.description}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={product.tutorialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block flex-1 border-2 border-primary-dark text-primary-dark text-sm px-3 py-2 rounded-lg hover:bg-primary-dark hover:text-white transition text-center"
                >
                  Lihat Tutorial
                </a>
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block flex-1 bg-primary-dark border-2 border-primary-dark text-white text-sm px-3 py-2 rounded-lg hover:bg-secondary hover:border-secondary transition text-center"
                >
                  Beli
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProdukKerajinan;
