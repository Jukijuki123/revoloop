"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/img/logoEartLine.svg";

const FINAL_TEXT = "REVOL OOP";
const TOTAL_DURATION = 3800;

const SLOT_CHARS = [
  "R","E","C","Y","C","L","E",
  "S","A","M","P","A","H",
  "H","I","J","A","U",
  "B","U","M","I",
  "D","A","U","R",
  "L","I","N","G","K","U","N","G","A","N",
  "O","R","G","A","N","I","K",
  "P","L","A","S","T","I","K",
  "E","K","O",
  "Z","E","R","O",
  "W","A","S","T","E",
  "G","R","E","E","N",
  "E","A","R","T","H",
];

function getRandomSlotChar() {
  return SLOT_CHARS[Math.floor(Math.random() * SLOT_CHARS.length)];
}

function useSlotMachine(finalText, start) {

  const length = finalText.length;

  const [slots, setSlots] = useState(() =>
    Array.from({ length }, () => getRandomSlotChar())
  );

  const settledRef = useRef(Array(length).fill(false));

  useEffect(() => {

    if (!start) return;

    finalText.split("").forEach((targetChar, colIndex) => {

      const settleDelay = colIndex * 160;
      const spinDuration = 800 + settleDelay;

      const spinInterval = setInterval(() => {

        if (settledRef.current[colIndex]) return;

        setSlots(prev => {

          const next = [...prev];
          next[colIndex] = getRandomSlotChar();
          return next;

        });

      }, 60);

      setTimeout(() => {

        clearInterval(spinInterval);

        settledRef.current[colIndex] = true;

        setSlots(prev => {

          const next = [...prev];
          next[colIndex] = targetChar;
          return next;

        });

      }, spinDuration);

    });

  }, [start, finalText]);

  return slots;
}

function SlotColumn({ char, isSettled }) {

  return (
    <motion.span
      key={char}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.15 }}
      className={`text-3xl md:text-5xl font-extrabold font-mono tracking-widest
      ${isSettled ? "text-lime-300" : "text-white/60"}`}
    >
      {char}
    </motion.span>
  );

}

export default function SplashScreen() {

  const [phase, setPhase] = useState("enter");
  const [slotStart, setSlotStart] = useState(false);
  const [settled, setSettled] = useState(
    Array(FINAL_TEXT.length).fill(false)
  );

  const slots = useSlotMachine(FINAL_TEXT, slotStart);

  useEffect(() => {

    if (!slotStart) return;

    FINAL_TEXT.split("").forEach((char, i) => {

      const delay = 800 + i * 160;

      setTimeout(() => {

        setSettled(prev => {

          const next = [...prev];
          next[i] = true;
          return next;

        });

      }, delay);

    });

  }, [slotStart]);

  useEffect(() => {

    const t1 = setTimeout(() => {

      setPhase("shift");
      setSlotStart(true);

    }, 900);

    const t2 = setTimeout(() => {

      setPhase("exit");

    }, TOTAL_DURATION);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };

  }, []);

  return (
    <AnimatePresence>

      {phase !== "exit" && (

        <motion.div
          key="splash"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark will-change-transform"
        >

          {/* Glow */}

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.15, scale: 2 }}
            transition={{ duration: 2 }}
            className="absolute w-96 h-96 rounded-full bg-lime-400 blur-3xl"
          />

          {/* Wrapper */}

          <motion.div
            layout
            className="flex items-center gap-5"
          >

            {/* Logo */}

            <motion.div
              layout
              initial={{ y: -120, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut"
              }}
              className="w-16 h-16"
            >
              <img
                src={logo}
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* SLOT */}

            <AnimatePresence>

              {phase === "shift" && (

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-1"
                >

                  {slots.map((char, i) => (

                    <SlotColumn
                      key={i}
                      char={char}
                      isSettled={settled[i]}
                    />

                  ))}

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

          {/* Loading */}

          <div className="absolute bottom-12 w-44 h-0.5 bg-white/10 rounded-full overflow-hidden">

            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: TOTAL_DURATION / 1000,
                ease: "linear"
              }}
              className="h-full bg-lime-400"
            />

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );

}