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
  enabledMethods: {
    visual: true,
    text: true,
    audioChord: true,
    audioVoice: true,
    haptic: true,
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
  start: () => set({ isActive: true }),
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
}));
