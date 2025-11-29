"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function WaterCongratsModal({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return onFinish();
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white text-black p-6 rounded-xl shadow-xl w-[320px] flex flex-col items-center justify-center text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <p className="font-semibold text-lg text-pink-600">
            🎉 yaaayyy!!! 🎉
          </p>
          <p className="mt-2 text-gray-800">
            You are very good girl and beautiful chellsss!!! 💕<br/>
            Now go drink water and come back 😘
          </p>

          <p className="mt-4 text-xl font-bold text-blue-600">
            Timer: {seconds}s
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
