"use client";

import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { SparklesText } from "../components/ui/sparkles-text";
import { QuestionModal } from "../components/ui/questions";
import { WaterCongratsModal } from "../components/ui/modal";
import { NoWaterModal } from "../components/ui/nowater";

export default function Home() {
  const questions = [
    "🥺💕 En chellamaa neengaa?",
    "💛🤗 En thangamaa neengaa?",
    "💎✨ En vairamaa neengaa?",
    "🍫😚 En choci baby ah neenga?",
    "🌹🥰 En sandhana kattaya neenga?",
    "🐎🔥 En naatu kattaya neenga?",
    "🍭💖 En chakara katti ah neenga?",
    "🥭😍 En Malgova mambazhama neenga?",
  ];

  const [index, setIndex] = useState(0);
  const [doneQuestions, setDoneQuestions] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [showNoModal, setShowNoModal] = useState(false);

  /** ───────── WATER LOCK LOGIC ───────── **/
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  // Every second reduce countdown
  useEffect(() => {
    if (!lockUntil) return;

    const interval = setInterval(() => {
      const left = lockUntil - Date.now();
      if (left <= 0) {
        setLockUntil(null);
        setRemainingTime(0);
        clearInterval(interval);
      } else {
        setRemainingTime(Math.ceil(left / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockUntil]);

  /** ───────── QUESTIONS LOGIC ───────── **/
  const handleQuestionAnswer = () => {
    if (lockUntil) return; // Block if locked

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setDoneQuestions(true);
    }
  };

  /** ───────── CAUSE LOCK (NO CLICK) ───────── **/
  const handleNoClick = () => {
    const plus60 = Date.now() + 60_000; // 1 minute

    // If already locked → extend
    if (lockUntil && lockUntil > Date.now()) {
      setLockUntil(lockUntil + 60_000);
    } else {
      setLockUntil(plus60);
    }

    setShowNoModal(true);
  };

  /** ───────── CONFETTI ───────── **/
  const triggerConfetti = () => {
    if (!timerDone || lockUntil) return;

    const end = Date.now() + 3000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white px-6">
      <SparklesText className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold max-w-[600px]">
        Hey kid, have you drunk water?
      </SparklesText>

      {/* Controls */}
      <div className="flex gap-3 mt-6">
        <Button onClick={handleNoClick} disabled={lockUntil !== null}>
          No
        </Button>

        <Button
          variant="secondary"
          disabled={!timerDone || lockUntil !== null}
          onClick={triggerConfetti}
        >
          Yes!
        </Button>
      </div>

      {/* When locked show countdown */}
      {lockUntil && (
        <>
          <p className="mt-4 text-red-400 text-center">
            😡 Thanni kudichitu vaa! apodhan you can enjoy the confetti...
            Locked for: <b>{remainingTime}s</b>
          </p>
          <p className="mt-4 text-red-400 text-center">
           NOTE : Pressing NO button extends the lock by 1 minute each time!
          </p>
        </>
      )}

      {/* Question modal only if NOT locked */}
      {!doneQuestions && !lockUntil && (
        <QuestionModal
          question={questions[index]}
          onAnswer={handleQuestionAnswer}
        />
      )}

      {/* Timer modal after questions finished */}
      {doneQuestions && !timerDone && (
        <WaterCongratsModal onFinish={() => setTimerDone(true)} />
      )}

      {/* Cute baby modal when NO */}
      {showNoModal && <NoWaterModal onClose={() => setShowNoModal(false)} />}
    </div>
  );
}
