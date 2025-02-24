import { useEffect, useRef } from "react";
import { useBreathingStore } from "../store/breathingStore";
import { BreathingVisual } from "./BreathingVisual";
import { BreathingAudio } from "./BreathingAudio";
import { BreathingVoice } from "./BreathingVoice";
import { BreathingSettings } from "./BreathingSettings";
import { DarkModeToggle } from "./DarkModeToggle";
import { CompletionCelebration } from "./CompletionCelebration";

export function BreathingController() {
  const {
    isActive,
    currentPhase,
    currentCycle,
    secondsRemaining,
    settings,
    start,
    stop,
    updateTimer,
    nextPhase,
  } = useBreathingStore();

  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      const newSecondsRemaining = secondsRemaining - 1;

      if (newSecondsRemaining <= 0) {
        nextPhase();
      } else {
        updateTimer(newSecondsRemaining);
      }

      if (currentCycle > settings.cycleCount) {
        stop();
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [
    isActive,
    secondsRemaining,
    currentCycle,
    settings.cycleCount,
    stop,
    updateTimer,
    nextPhase,
  ]);

  return (
    <div className="min-h-screen bg-breathing-neutral dark:bg-breathing-dark/95 p-4 transition-colors duration-300">
      <DarkModeToggle />
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8">
        <div className="relative w-full max-w-2xl aspect-square">
          <BreathingVisual
            phase={currentPhase}
            progress={1 - secondsRemaining / settings.secondsPerPhase}
          />
          <BreathingAudio phase={currentPhase} />
          <BreathingVoice
            phase={currentPhase}
            secondsRemaining={secondsRemaining}
          />
        </div>

        <div className="text-center">
          <div className="mt-8 text-2xl font-semibold text-breathing-dark dark:text-breathing-neutral">
            {currentPhase === "prepare"
              ? "GET READY"
              : currentPhase.replace("-", " ").toUpperCase()}
          </div>

          {currentPhase !== "prepare" && (
            <div className="mt-4 text-xl text-breathing-primary dark:text-breathing-secondary">
              Cycle {currentCycle} of {settings.cycleCount}
            </div>
          )}

          <button
            onClick={isActive ? stop : start}
            className="mt-8 px-8 py-3 rounded-full bg-breathing-primary dark:bg-breathing-accent
                     text-white dark:text-breathing-dark font-medium text-lg
                     hover:bg-breathing-accent dark:hover:bg-breathing-secondary
                     transition-colors duration-200"
          >
            {isActive ? "Stop" : "Start"}
          </button>
        </div>

        {!isActive && <BreathingSettings />}
      </div>
    </div>
  );
}
