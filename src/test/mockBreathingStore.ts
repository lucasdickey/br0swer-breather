import { BreathingState } from '@/types/breathing.ts';

export const mockBreathingStore: BreathingState = {
  isActive: false,
  currentPhase: 'prepare',
  currentCycle: 1,
  secondsRemaining: 3,
  settings: {
    cycleCount: 4,
    secondsPerPhase: 4,
    volume: {
      voice: 0.7,
      chord: 0.5,
    },
    enabledMethods: {
      audioChord: true,
      voiceGuide: true,
      visualGuide: true,
    },
  },
  start: jest.fn(),
  stop: jest.fn(),
  updateTimer: jest.fn(),
  nextPhase: jest.fn(),
  updateSettings: jest.fn(),
  updatePhase: jest.fn(),
};
