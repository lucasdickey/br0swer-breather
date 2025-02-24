import {
  BreathingStore,
  BreathingSettings,
  BreathingPhase,
} from "@/types/breathing";
import { create } from "zustand";

const DEFAULT_TEST_SETTINGS: BreathingSettings = {
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

export const createMockStore = (overrides = {}) => {
  const store = create<BreathingStore>((set, get) => {
    // Create mock functions that also update state
    const start = jest.fn().mockImplementation(() => {
      set({ isActive: true });
    });

    const stop = jest.fn().mockImplementation(() => {
      set({
        isActive: false,
        currentCycle: 1,
        currentPhase: "inhale",
        secondsRemaining: DEFAULT_TEST_SETTINGS.secondsPerPhase,
      });
    });

    const updatePhase = jest
      .fn()
      .mockImplementation((phase: BreathingPhase) => {
        set({ currentPhase: phase });
      });

    const updateSettings = jest
      .fn()
      .mockImplementation((newSettings: Partial<BreathingSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      });

    const updateTimer = jest.fn().mockImplementation((seconds: number) => {
      set({ secondsRemaining: seconds });
    });

    const nextPhase = jest.fn().mockImplementation(() => {
      const state = get();
      const phases: BreathingPhase[] = [
        "inhale",
        "hold-in",
        "exhale",
        "hold-out",
      ];
      const currentIndex = phases.indexOf(state.currentPhase);
      const nextIndex = (currentIndex + 1) % phases.length;
      const nextPhase = phases[nextIndex];
      const isNewCycle = nextPhase === "inhale";

      set({
        currentPhase: nextPhase,
        currentCycle: isNewCycle ? state.currentCycle + 1 : state.currentCycle,
        secondsRemaining: state.settings.secondsPerPhase,
      });
    });

    return {
      // State
      isActive: false,
      currentPhase: "inhale" as BreathingPhase,
      currentCycle: 1,
      secondsRemaining: 4,
      settings: DEFAULT_TEST_SETTINGS,

      // Actions
      start,
      stop,
      updatePhase,
      updateSettings,
      updateTimer,
      nextPhase,
      ...overrides,
    };
  });

  return store.getState();
};

export const mockBreathingStore = (overrides = {}) => {
  const store = createMockStore(overrides);
  const useBreathingStore = jest.requireMock(
    "@/store/breathingStore"
  ).useBreathingStore;

  useBreathingStore.mockImplementation(() => store);

  return store;
};
