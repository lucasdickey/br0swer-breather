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
      const nextIndex = (currentIndex + 1) % (phases.length - 1);
      const nextPhase = phases[nextIndex === 0 ? 1 : nextIndex];

      const isNewCycle =
        nextPhase === "inhale" && state.currentPhase === "hold-out";
      const currentCycle = isNewCycle
        ? state.currentCycle + 1
        : state.currentCycle;

      return {
        currentPhase: nextPhase,
        currentCycle,
        secondsRemaining: state.settings.secondsPerPhase,
      };
    }),
}));
