"use client";

import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Kumpulkan Sampah di Rumah", desc: "Pisahkan plastik, kertas, logam, dan kaca sejak dari rumah. Pemilahan awal membuat sampah lebih mudah ditimbang serta meningkatkan kualitas daur ulang.", img: "/images/checkBox.png" },
  { id: 2, title: "Temukan Lokasi Penukaran", desc: "Cari dan pilih lokasi Bank Sampah terdekat melalui peta. Periksa juga jam operasionalnya agar proses penukaran berjalan lancar saat kamu datang.", img: "/images/mobileBox.png" },
  { id: 3, title: "Isi Detail Tukar Sampah", desc: "Tentukan lokasi pengepul yang kamu pilih lalu isi detail penukaran. Atur waktu pengantaran sampah sesuai jadwalmu agar proses lebih fleksibel.", img: "/images/truckBox.png" },
  { id: 4, title: "Timbang & Dapatkan Uang", desc: "Serahkan sampahmu kepada petugas untuk ditimbang. Tunjukkan bukti penukaran lalu terima hasilnya secara langsung dengan proses yang cepat.", img: "/images/transaksi.png" },
];

const CaraKerjaSection = () => {
  return (
    <section id="carakerja" className="bg-white py-20 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-primary-dark mb-3">
          Cara <span className="text-lime-600">Kerja Sistem</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="text-sm md:text-base text-abu max-w-3xl mx-auto mb-16">
          Sistem kami dirancang agar pengelolaan sampah menjadi lebih efisien, transparan, dan berdampak positif bagi lingkungan.
        </motion.p>
        <div className="relative">
          <div className="hidden lg:block absolute top-[74px] left-0 right-0 h-[3px] bg-linear-to-r from-green-500 to-orange-400 rounded-full z-0" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 items-stretch">
            {steps.map((step, index) => (
              <div key={step.id}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.3 }} viewport={{ once: true }} className="flex flex-col items-center text-center h-full z-10">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center bg-primary-light rounded-2xl shadow-sm mb-6">
                    <img src={step.img} alt={step.title} className="w-20 h-20 object-contain" />
                    <div className="w-10 h-10 text-center items-center rounded-full bg-primary-dark absolute -top-4 -left-4">
                      <h3 className="text-2xl font-semibold text-white p-1">{step.id}</h3>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-3 min-h-[60px] flex items-center justify-center">{step.title}</h3>
                  <p className="text-sm text-abu leading-relaxed max-w-[260px] min-h-[150px]">{step.desc}</p>
                </motion.div>
                {index !== steps.length - 1 && (
                  <div className="md:hidden flex justify-center">
                    <div className="w-[3px] h-12 bg-linear-to-b from-green-500 to-orange-400 rounded-full -mt-4 mb-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaraKerjaSection;
