import { useEffect, useRef } from "react";
import { useBreathingStore } from "@/store/breathingStore";
import { BreathingPhase } from "@/types/breathing";
import { BreathingVisual } from "./BreathingVisual";
import { BreathingAudio } from "./BreathingAudio";
import { BreathingVoice } from "./BreathingVoice";
import { BreathingSettings } from "./BreathingSettings";

const PHASE_ORDER: BreathingPhase[] = [
  "inhale",
  "hold-in",
  "exhale",
  "hold-out",
];

export function BreathingController() {
  const {
    isActive,
    currentPhase,
    currentCycle,
    secondsRemaining,
    settings,
    start,
    stop,
    updatePhase,
  } = useBreathingStore();

  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isActive) return;

    timerRef.current = setInterval(() => {
      useBreathingStore.setState((state) => {
        const newSecondsRemaining = state.secondsRemaining - 1;

        if (newSecondsRemaining <= 0) {
          const currentPhaseIndex = PHASE_ORDER.indexOf(state.currentPhase);
          const nextPhaseIndex = (currentPhaseIndex + 1) % PHASE_ORDER.length;
          const nextPhase = PHASE_ORDER[nextPhaseIndex];

          // If we've completed a full cycle
          if (nextPhase === "inhale") {
            if (state.currentCycle >= state.settings.cycleCount) {
              clearInterval(timerRef.current);
              return {
                isActive: false,
                currentCycle: 1,
                currentPhase: "inhale",
                secondsRemaining: state.settings.secondsPerPhase,
              };
            }
            return {
              currentCycle: state.currentCycle + 1,
              currentPhase: nextPhase,
              secondsRemaining: state.settings.secondsPerPhase,
            };
          }

          return {
            currentPhase: nextPhase,
            secondsRemaining: state.settings.secondsPerPhase,
          };
        }

        return { secondsRemaining: newSecondsRemaining };
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isActive]);

  return (
    <div className="min-h-screen bg-breathing-neutral p-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
        <div className="relative w-full max-w-md aspect-square">
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
          <div className="mt-8 text-2xl font-semibold text-breathing-dark">
            {currentPhase.replace("-", " ").toUpperCase()}
          </div>

          <div className="mt-4 text-xl text-breathing-primary">
            Cycle {currentCycle} of {settings.cycleCount}
          </div>

          <button
            onClick={isActive ? stop : start}
            className="mt-8 px-8 py-3 rounded-full bg-breathing-primary text-white text-lg font-medium
                     hover:bg-breathing-accent transition-colors"
          >
            {isActive ? "Stop" : "Start"}
          </button>
        </div>

        {!isActive && <BreathingSettings />}
      </div>
    </div>
  );
}
