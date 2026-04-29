// ─────────────────────────────────────────────────────────────────────────────
// components/ui/AnimatedNumber.jsx
// Komponen angka yang animasi menghitung dari 0 ke nilai target saat terlihat
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function AnimatedNumber({ value, duration = 2, decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setDisplay(progress * value);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return <span ref={ref}>{display.toFixed(decimals)}</span>;
}
