"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function QuestionModal({
  question,
  onAnswer,
}: {
  question: string;
  onAnswer: () => void;
}) {
  const [noClicked, setNoClicked] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white text-black p-6 rounded-xl shadow-xl w-[300px] flex flex-col items-center justify-center text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          {!noClicked ? (
            <>
              <p className="font-semibold text-lg mb-4">{question}</p>

              <div className="flex gap-4">
                <button
                  className="bg-black text-white px-4 py-2 rounded-md"
                  onClick={onAnswer}
                >
                  Yes 💕
                </button>

                <button
                  className="bg-gray-200 text-black px-4 py-2 rounded-md"
                  onClick={() => setNoClicked(true)}
                >
                  No 😒
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-pink-600 font-medium">
                Sorry babyyy this button will not work because you are my luff! 💗
              </p>

              <button
                className="px-4 py-2 bg-pink-500 text-white rounded-md shadow"
                onClick={() => setNoClicked(false)}
              >
                Go Back ↩️
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
