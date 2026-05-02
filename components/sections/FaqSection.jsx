"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const faqs = [
    { q: "Apa itu penjualan sampah?", a: "Penjualan sampah adalah kegiatan mengumpulkan dan menjual kembali sampah yang masih bisa didaur ulang atau dimanfaatkan, seperti plastik, kertas, dan logam.", maxWidth: "max-w-[600px]" },
    { q: "Apa manfaat utama dari menjual sampah?", a: "Menjual sampah membantu menjaga kebersihan lingkungan, mengurangi limbah, dan memberikan tambahan penghasilan.", maxWidth: "max-w-[700px]" },
    { q: "Bagaimana caranya memanfaatkan sampah yang masih sedikit?", a: "Kamu bisa mengolah sampah yang kamu miliki menjadi barang-barang yang bermanfaat, seperti Kotak Tisu dari tutup botol, Tas dari Plastik, Jam Dinding dari stik es krim, dll. Sampah sedikit pun bisa menjadi sesuatu yang berguna dan bernilai jual.", maxWidth: "max-w-[800px]" },
    { q: "Bagaimana dampak sosial dari kegiatan penjualan sampah?", a: "Penjualan sampah menciptakan peluang kerja baru, memperkuat kesadaran lingkungan, dan membangun kebersamaan dalam menjaga kebersihan komunitas.", maxWidth: "max-w-[700px]" },
    { q: "Apakah semua jenis sampah bisa dijual?", a: "Tidak semua. Hanya sampah yang bisa didaur ulang seperti botol plastik, kardus, besi, dan alumunium yang memiliki nilai jual.", maxWidth: "max-w-[600px]" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (openIndex !== null && contentRefs.current[openIndex]) {
        const content = contentRefs.current[openIndex];
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openIndex]);

  const toggleFAQ = (index) => { setOpenIndex(openIndex === index ? null : index); };

  return (
    <section id="faq" className="relative w-full max-w-screen h-full px-6 sm:px-10 md:px-24 py-20 md:pb-32 overflow-hidden bg-white">
      {/* ── Decorative Background Elements ── */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Large outlined circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 border-[40px] border-primary-dark/10 rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 border-[50px] border-secondary/10 rounded-full" />

        {/* Small floating dots */}
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-secondary/40 rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary-dark/30 rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-green-400/50 rounded-full" />
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-12 -right-12 w-56 h-56 bg-primary-dark/5 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-10 w-40 h-40 bg-secondary/10 rounded-full pointer-events-none" />

      <motion.div className="max-w-4xl mx-auto px-4 text-center mb-8" initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold text-primary-dark">Pertanyaan Umum (FAQ)</h2>
        <p className="text-abu mt-2">Temukan jawaban atas pertanyaan yang sering diajukan seputar REVOLOOP.</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center space-y-4">
        {faqs.map((faq, index) => (
          <motion.div key={index} className={`faq-item w-full ${faq.maxWidth} bg-[#F1FAF3] border border-primary-dark rounded-xl overflow-hidden`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} viewport={{ once: true }}>
            <button onClick={() => toggleFAQ(index)} className={`faq-button w-full p-4 text-left flex justify-between items-center transition-colors duration-300 ${openIndex === index ? "text-gray-900" : "text-primary-dark"}`}>
              <span className="font-semibold">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            <div ref={(el) => (contentRefs.current[index] = el)} style={{ maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : "0px" }} className="faq-answer bg-white text-gray-600 transition-all duration-300 overflow-hidden">
              <div className="p-4">{faq.a}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
