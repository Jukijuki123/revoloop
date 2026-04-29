"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
  { id: 1, title: "Pemilahan Sampah", description: "Video edukatif tentang cara memilah sampah dengan benar untuk lingkungan yang lebih bersih.", thumbnail: "/images/eduPemilhanSampah.jpg", url: "https://youtu.be/nrANKUUHBf0?si=NbTkduYRYi8ejGcx", channelName: "Rumah Sakit Akademik UGM", date: "06 Oktober 2023", channelLogo: "/images/ugm.jpeg" },
  { id: 2, title: "Manfaatkan Jadi Cuan", description: "Ubah sampah jadi sumber penghasilan! Yuk, mulai kelola sampah dengan bijak dan rasakan manfaat ekonominya.", thumbnail: "/images/eduSampahJadiCuan.jpg", url: "https://youtu.be/j4qezIj3tsc?si=QImuwg6sud9wwXvl", channelName: "DWIndonesia", date: "15 November 2024", channelLogo: "/images/dw.jpg" },
  { id: 3, title: "Ubah Sampah Plastik", description: "Kisah Putu Eka Darmawan yang mengubah sampah plastik menjadi produk bernilai tinggi hingga diekspor ke luar negeri.", thumbnail: "/images/eduEksporSampah.jpg", url: "https://youtu.be/GUTfkAWphFs?si=64HVi1n7lRoGfALh", channelName: "BBC News Indonesia", date: "10 November 2024", channelLogo: "/images/bbcNews.png" },
];

const ImpactSection = () => {
  return (
    <section className="bg-primary-light py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl text-primary-dark font-bold text-center mb-8">
          Dampak <span className="text-lime-600">Pengolahan</span>
        </h2>
        <div className="max-w-5xl mx-auto px-4 overflow-x-auto scroll-smooth no-scrollbar">
          <div className="flex flex-nowrap justify-between gap-4 pb-4">
            {videos.map((video) => (
              <motion.article key={video.id} className="bg-white p-4 w-72 relative rounded-2xl shrink-0 shadow-md hover:shadow-lg transition-all duration-300">
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="block relative">
                  <div className="rounded-xl overflow-hidden mb-4">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <motion.button type="button" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.preventDefault(); window.open(video.url, "_blank", "noopener,noreferrer"); }}
                    className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-12 shadow-md"
                  >
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </motion.button>
                  <div className="mb-6 mt-2">
                    <h3 className="text-lg md:text-xl mb-1 font-semibold text-gray-900 hover:underline">{video.title}</h3>
                    <p className="text-sm text-abu">{video.description}</p>
                  </div>
                </a>
                <div className="flex flex-row gap-4 items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={video.channelLogo} alt={video.channelName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{video.channelName}</h4>
                    <span className="text-xs text-abu">{video.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
