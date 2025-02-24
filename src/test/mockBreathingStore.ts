import { BreathingStore, BreathingSettings } from "@/types/breathing";

export const DEFAULT_SETTINGS: BreathingSettings = {
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

export const mockBreathingStore = (initialState = {}): BreathingStore => ({
  isActive: false,
  currentPhase: "inhale",
  currentCycle: 1,
  secondsRemaining: 4,
  settings: DEFAULT_SETTINGS,
  start: jest.fn(),
  stop: jest.fn(),
  updatePhase: jest.fn(),
  updateSettings: jest.fn(),
  updateTimer: jest.fn(),
  nextPhase: jest.fn(),
  ...initialState,
});
