"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";

export function AnimatedNumber({
  value,
  suffix = "",
  duration = 1.5,
  decimals = 0,
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  const handleViewportEnter = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const controls = animate(0, value, {
      duration,
      onUpdate(latest) {
        setDisplayValue(latest);
      },
    });

  };

  return (
    <motion.span
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, amount: 0.6 }}
    >
      {displayValue.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}
