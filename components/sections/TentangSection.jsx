"use client";

import { motion } from "framer-motion";
import { PiggyBank, BookOpen, Leaf, Smartphone, Users, Building2, ShieldCheck } from "lucide-react";

const features = [
  { icon: PiggyBank, label: "Pendapatan Tambahan" },
  { icon: Leaf, label: "Dampak Lingkungan Positif" },
  { icon: BookOpen, label: "Edukasi Pengelolaan" },
  { icon: Smartphone, label: "Kemudahan Akses Digital" },
];

const stats = [
  { icon: Users, value: "5000 +", label: "Pengguna Aktif" },
  { icon: Building2, value: "50 +", label: "Bank Mitra" },
  { icon: ShieldCheck, value: "100 %", label: "Transaksi Aman" },
];

const environmentStats = [
  { value: "67.29%", label: "Sampah tidak terkelola/tahun", highlight: true },
  { value: "32.71%", label: "Sampah terkelola/tahun", highlight: false },
  { value: "36,538,247.59 TON", label: "Sampah/tahun", highlight: false },
];

export default function TentangSection() {
  return (
    <section id="tentang" className="py-10">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <div className="bg-white overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[380px]">

            {/* ── Left: Text Column ─────────────────────────────── */}
            <motion.div
              className="lg:w-[42%] flex flex-col justify-between p-7 md:p-9 order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Top block */}
              <div>
                {/* Logo label */}
                <div className="inline-flex items-center gap-1.5 mb-4">
                  <img src="/images/logorevoloop.svg" alt="Logo" className="w-5 h-5" />
                  <span className="text-xs font-extrabold tracking-widest text-gray-400 uppercase">REVOLOOP</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark leading-tight mb-3">
                  Lebih Kenal <br />
                  <span className="text-gray-900">Dengan </span>
                  <span className="text-primary-dark">Kami</span>
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
                  Platform digital ini digunakan untuk mengelola dan menjual sampah daur ulang dengan cepat, transparan, dan ramah lingkungan.
                </p>

                {/* Feature grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {features.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary-dark/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary-dark" />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats bar at the bottom */}
              <div className="mt-8 pt-5 border-t border-gray-100 grid grid-cols-3 divide-x divide-gray-100">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex flex-col items-center px-2 text-center first:pl-0 last:pr-0">
                    <Icon className="w-5 h-5 text-primary-dark mb-1" />
                    <span className="text-base font-extrabold text-gray-900 leading-none">{value}</span>
                    <span className="text-[10px] text-gray-400 mt-0.5 leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Center: Image (with overlaid stats) ─────────── */}
            <motion.div
              className="lg:flex-1 relative order-1 lg:order-2 min-h-[260px] lg:min-h-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src="/images/2anak.png"
                alt="Anak-anak memilah sampah"
                className="w-full rounded-bl-[40%] h-full object-cover object-center"
                style={{ minHeight: "260px" }}
              />


              {/* ── Environment Stats (absolute over image) ── */}
              <motion.div
                className="absolute top-4 right-4 flex flex-col gap-2.5 w-36"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
              >
                {environmentStats.map(({ value, label, highlight }) => (
                  <div
                    key={label}
                    className={`rounded-xl px-3 py-2.5 shadow-md border backdrop-blur-sm ${highlight
                      ? "bg-primary-dark text-white border-primary-dark"
                      : "bg-white/90 text-gray-900 border-white/60"
                      }`}
                  >
                    <p className={`text-base font-extrabold leading-none ${highlight ? "text-white" : "text-primary-dark"
                      }`}>
                      {value}
                    </p>
                    <p className={`text-[10px] mt-1 leading-tight ${highlight ? "text-green-100" : "text-gray-500"
                      }`}>
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
