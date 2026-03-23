"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Clock,
  MapPin,
  Facebook,
  Twitter,
  Dribbble,
  Apple,
  Play,
} from "lucide-react";

const socialLinks = [
  {
    icon: Dribbble,
    url: "https://dribbble.com/",
  },
  {
    icon: Twitter,
    url: "https://twitter.com/",
  },
  {
    icon: Facebook,
    url: "https://facebook.com/",
  },
];

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-primary-dark via-primary-dark to-primary text-white py-10 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="grid gap-10 md:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
              <span className="text-lime-300">REVO</span>
              <span className="ml-1">LOOP</span>
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-gray-100 max-w-md">
              Membantu mempermudah masyarakat dalam mengelola sampah secara
              efektif dan bertanggung jawab serta mengubah sampah menjadi
              sumber manfaat melalui pengelolaan yang tepat.
            </p>

            {/* SOCIAL ICON */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center text-white"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-3 text-sm md:text-base"
          >
            {/* PHONE */}
            <div>
              <h3 className="font-semibold mb-2">Nomor Telepon</h3>
              <a
                href="tel:082399631182"
                className="text-gray-100 flex items-center gap-2 hover:underline"
              >
                <Phone className="w-4 h-4" />
                <span>0823-9963-1182</span>
              </a>
            </div>

            {/* NAVIGASI */}
            <div>
              <h3 className="font-semibold mb-2">Navigasi</h3>
              <ul className="space-y-1 text-gray-100">
                <li>
                  <a href="#tentang" className="hover:underline">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#edukasi" className="hover:underline">
                    Edukasi
                  </a>
                </li>
                <li>
                  <a href="#trashcash" className="hover:underline">
                    Tukar Sampah
                  </a>
                </li>
                <li>
                  <a href="#komunitas" className="hover:underline">
                    Komunitas
                  </a>
                </li>
              </ul>
            </div>

            {/* SOCIAL MEDIA */}
            <div>
              <h3 className="font-semibold mb-2">Sosial Media</h3>
              <ul className="space-y-1 text-gray-100">
                <li>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <hr className="border-white/40" />

        <div className="grid gap-8 md:grid-cols-3 items-start text-sm md:text-base">

          {/* DOWNLOAD APP */}
          <div className="space-y-3">
            <h3 className="font-semibold">Dapatkan Aplikasi</h3>

            <div className="flex flex-wrap gap-3">

              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-gray-900 rounded-xl px-3 py-2 shadow-sm"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase tracking-wide">
                    Download on the
                  </p>
                  <p className="text-xs font-semibold">App Store</p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-gray-900 rounded-xl px-3 py-2 shadow-sm"
              >
                <Play className="w-6 h-6" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase tracking-wide">
                    Get it on
                  </p>
                  <p className="text-xs font-semibold">Google Play</p>
                </div>
              </motion.a>

            </div>
          </div>

          {/* JAM */}
          <div>
            <h3 className="font-semibold mb-2">Jam Operasional</h3>
            <p className="text-gray-100 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>08.00 WIB - 16.00 WIB</span>
            </p>
          </div>

          {/* LOKASI */}
          <div>
            <h3 className="font-semibold mb-2">Lokasi</h3>
            <a
              href="https://maps.app.goo.gl/6ftFYGBV5ijAsXMn6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 flex items-start gap-2 hover:underline"
            >
              <MapPin className="w-4 h-4 mt-1" />
              <span>Bank Sampah Persatuan Jakarta</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;