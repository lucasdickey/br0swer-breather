import { create } from "zustand";
import {
  BreathingPhase,
  BreathingSettings,
  BreathingState,
} from "@/types/breathing";

interface BreathingStore extends BreathingState {
  settings: BreathingSettings;
  start: () => void;
  stop: () => void;
  updatePhase: (phase: BreathingPhase) => void;
  updateSettings: (settings: Partial<BreathingSettings>) => void;
}

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
  isActive: false,
  currentPhase: "inhale",
  currentCycle: 1,
  secondsRemaining: 4,
  settings: DEFAULT_SETTINGS,

  start: () => set({ isActive: true }),
  stop: () => set({ isActive: false, currentCycle: 1, currentPhase: "inhale" }),
  updatePhase: (phase) => set({ currentPhase: phase }),
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));
