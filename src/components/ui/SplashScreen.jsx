"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/img/logoEartLine.svg";

// ========================================
// Constants
// ========================================

const FINAL_TEXT = "REVOLOOP";
const TOTAL_DURATION = 6000;

// slot characters
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

// ========================================
// Slot Machine Hook
// ========================================

function useSlotMachine(finalText, start) {
  const length = finalText.length;

  const [slots, setSlots] = useState(() =>
    Array.from({ length }, () => getRandomSlotChar())
  );

  const settledRef = useRef(Array(length).fill(false));
  const framesRef = useRef([]);

  useEffect(() => {
    if (!start) return;

    finalText.split("").forEach((targetChar, colIndex) => {

      const settleDelay = colIndex * 160;
      const spinDuration = 800 + settleDelay;

      const spinInterval = setInterval(() => {

        if (settledRef.current[colIndex]) {
          clearInterval(spinInterval);
          return;
        }

        setSlots(prev => {
          const next = [...prev];
          next[colIndex] = getRandomSlotChar();
          return next;
        });

      }, 60);

      framesRef.current.push(spinInterval);

      const settleTimeout = setTimeout(() => {

        clearInterval(spinInterval);

        settledRef.current[colIndex] = true;

        setSlots(prev => {
          const next = [...prev];
          next[colIndex] = targetChar;
          return next;
        });

      }, spinDuration);

      framesRef.current.push(settleTimeout);

    });

    return () =>
      framesRef.current.forEach(t => {
        clearInterval(t);
        clearTimeout(t);
      });

  }, [start, finalText]);

  return slots;
}

function getRandomSlotChar() {
  return SLOT_CHARS[Math.floor(Math.random() * SLOT_CHARS.length)];
}

// ========================================
// Slot Column
// ========================================

function SlotColumn({ char, isSettled, index }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.25
      }}
      className="relative w-7 md:w-9 h-10 md:h-12 overflow-hidden flex items-center justify-center"
    >

      <motion.span
        key={char}
        initial={{
          y: isSettled ? 0 : -14,
          opacity: isSettled ? 1 : 0.5
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: isSettled ? 0.25 : 0.06,
          ease: "easeOut"
        }}
        className={`text-2xl md:text-3xl font-extrabold tracking-widest font-mono select-none
        ${isSettled ? "text-lime-300" : "text-white/60"}`}
      >
        {char}
      </motion.span>

      {isSettled && (
        <motion.div
          initial={{
            opacity: 0.8,
            scaleY: 1.4
          }}
          animate={{
            opacity: 0,
            scaleY: 1
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-lime-400/20 rounded-sm"
        />
      )}

    </motion.div>
  );
}

// ========================================
// SplashScreen
// ========================================

export default function SplashScreen() {

  const [phase, setPhase] = useState("enter");
  const [slotStart, setSlotStart] = useState(false);

  const [settled, setSettled] = useState(
    Array(FINAL_TEXT.length).fill(false)
  );

  const slots = useSlotMachine(FINAL_TEXT, slotStart);

  // track settle letters

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

  // animation timeline

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
    <AnimatePresence mode="wait">

      {phase !== "exit" ? (

        <motion.div
          key="splash"
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark overflow-hidden will-change-transform"
        >

          {/* glow background */}

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.12, scale: 2 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-96 h-96 rounded-full bg-lime-400 blur-3xl pointer-events-none"
          />

          <div className="relative flex items-center justify-center gap-5">

            {/* logo */}

            <motion.div
              initial={{ y: -140, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: "easeOut"
              }}
            >

              <motion.div
                animate={
                  phase === "shift"
                    ? {
                        filter: "drop-shadow(0 0 18px #a3e635)",
                        scale: 1.05
                      }
                    : {
                        filter: "drop-shadow(0 0 0px transparent)",
                        scale: 1
                      }
                }
                transition={{ duration: 0.5 }}
                className="w-14 h-14 md:w-18 md:h-18"
              >
                <img
                  src={logo}
                  alt="EarthLine"
                  className="w-full h-full object-contain"
                />
              </motion.div>

            </motion.div>

            {/* SLOT MACHINE */}

            <AnimatePresence>

              {phase === "shift" && (

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -16
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut"
                  }}
                  className="flex items-center gap-0.5"
                >

                  {slots.map((char, i) => (

                    <SlotColumn
                      key={i}
                      index={i}
                      char={char}
                      isSettled={settled[i]}
                    />

                  ))}

                </motion.div>

              )}

            </AnimatePresence>

          </div>

          {/* loading bar */}

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-44 h-0.5 bg-white/10 rounded-full overflow-hidden">

            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: TOTAL_DURATION / 1000 - 0.3,
                ease: "easeInOut",
                delay: 0.2
              }}
              className="h-full bg-lime-400 rounded-full"
            />

          </div>

        </motion.div>

      ) : (

        // EXIT

        <motion.div
          key="splash-exit"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{
            duration: 1.0,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="fixed inset-0 z-50 bg-primary-dark will-change-transform"
        />

      )}

    </AnimatePresence>
  );
}