import { create } from "zustand";
import {
  BreathingState,
  BreathingSettings,
  BreathingPhase,
  BreathingStore,
} from "@/types/breathing";

const DEFAULT_SETTINGS: BreathingSettings = {
  cycleCount: 4,
  secondsPerPhase: 4,
  prepareSeconds: 3,
  enabledMethods: {
    visual: true,
    text: true,
    audioChord: true,
    audioVoice: true,
  },
  volume: {
    chord: 0.5,
    voice: 0.5,
  },
};

export const useBreathingStore = create<BreathingStore>((set) => ({
  // Initial state
  isActive: false,
  currentPhase: "inhale" as BreathingPhase,
  currentCycle: 1,
  secondsRemaining: DEFAULT_SETTINGS.secondsPerPhase,
  settings: DEFAULT_SETTINGS,

  // Actions
  start: () =>
    set({
      isActive: true,
      currentPhase: "prepare",
      currentCycle: 1,
      secondsRemaining: DEFAULT_SETTINGS.prepareSeconds,
    }),
  stop: () =>
    set({
      isActive: false,
      currentCycle: 1,
      currentPhase: "inhale",
      secondsRemaining: DEFAULT_SETTINGS.secondsPerPhase,
    }),
  updatePhase: (phase: BreathingPhase) => set({ currentPhase: phase }),
  updateSettings: (newSettings: Partial<BreathingSettings>) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  updateTimer: (secondsRemaining: number) => set({ secondsRemaining }),
  nextPhase: () =>
    set((state) => {
      const phases: BreathingPhase[] = [
        "prepare",
        "inhale",
        "hold-in",
        "exhale",
        "hold-out",
      ];
      const currentIndex = phases.indexOf(state.currentPhase);

      // If we're in prepare, go to inhale
      if (state.currentPhase === "prepare") {
        return {
          currentPhase: "inhale",
          secondsRemaining: state.settings.secondsPerPhase,
        };
      }

      // If we're in hold-out, go back to inhale and increment cycle
      if (state.currentPhase === "hold-out") {
        return {
          currentPhase: "inhale",
          currentCycle: state.currentCycle + 1,
          secondsRemaining: state.settings.secondsPerPhase,
        };
      }

      // Otherwise, go to next phase
      const nextPhase = phases[currentIndex + 1];
      return {
        currentPhase: nextPhase,
        secondsRemaining: state.settings.secondsPerPhase,
      };
    }),
}));
