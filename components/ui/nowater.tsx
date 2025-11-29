"use client";

import { motion, AnimatePresence } from "framer-motion";

export function NoWaterModal({ onClose }: { onClose: () => void }) {
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
          <p className="text-lg font-semibold text-rose-600">
            😭 Achachoooo!
          </p>
          <p className="mt-2 text-gray-800">
            Dine mama kova paduvaru 😠<br/>
            Chikiram thanni kudichirunga! 💧🥺
          </p>

          <button
            className="mt-5 bg-rose-500 text-white px-4 py-2 rounded-md shadow"
            onClick={onClose}
          >
            Okay ❤️
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
