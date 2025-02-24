import { BreathingStore, BreathingSettings } from "@/types/breathing";

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

export const createMockStore = (overrides = {}): Partial<BreathingStore> => ({
  isActive: false,
  currentPhase: "inhale",
  currentCycle: 1,
  secondsRemaining: 4,
  settings: DEFAULT_TEST_SETTINGS,
  start: jest.fn(),
  stop: jest.fn(),
  updatePhase: jest.fn(),
  updateSettings: jest.fn(),
  ...overrides,
});

type Selector<T> = (state: BreathingStore) => T;

export const mockBreathingStore = (overrides = {}) => {
  const store = createMockStore(overrides);
  const useBreathingStore = jest.requireMock(
    "@/store/breathingStore"
  ).useBreathingStore;
  useBreathingStore.mockImplementation(<T>(selector?: Selector<T>) =>
    selector ? selector(store as BreathingStore) : store
  );
  return store;
};
