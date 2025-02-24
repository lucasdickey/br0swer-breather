import { render } from "@testing-library/react";
import { BreathingAudio } from "../BreathingAudio";
import * as breathingStore from "@/store/breathingStore";

// Mock the store module
jest.mock("@/store/breathingStore", () => ({
  useBreathingStore: jest.fn(),
}));

describe("BreathingAudio", () => {
  // Track if audio was initialized
  let audioInitialized = false;
  let audioStarted = false;
  let currentFrequency = 0;
  let currentVolume = 0;

  // Mock minimal AudioContext behavior
  beforeEach(() => {
    audioInitialized = false;
    audioStarted = false;
    currentFrequency = 0;
    currentVolume = 0;

    // Mock store with default enabled state
    jest.spyOn(breathingStore, "useBreathingStore").mockImplementation(
      (selector) =>
        selector?.({
          settings: {
            enabledMethods: { audioChord: true },
            volume: { chord: 0.5 },
          },
        } as any) ?? {
          settings: {
            enabledMethods: { audioChord: true },
            volume: { chord: 0.5 },
          },
        }
    );

    // Mock AudioContext
    global.AudioContext = jest.fn().mockImplementation(() => {
      audioInitialized = true;
      return {
        createOscillator: () => ({
          connect: jest.fn(),
          frequency: {
            get value() {
              return currentFrequency;
            },
            set value(v) {
              currentFrequency = v;
            },
          },
          start: () => {
            audioStarted = true;
          },
          disconnect: jest.fn(),
          stop: jest.fn(),
        }),
        createGain: () => ({
          connect: jest.fn(),
          gain: {
            get value() {
              return currentVolume;
            },
            set value(v) {
              currentVolume = v;
            },
          },
        }),
        destination: {},
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initializes audio when enabled", () => {
    render(<BreathingAudio phase="inhale" />);
    expect(audioInitialized).toBe(true);
    expect(audioStarted).toBe(true);
  });

  it("does not initialize audio when disabled", () => {
    jest.spyOn(breathingStore, "useBreathingStore").mockImplementation(
      (selector) =>
        selector?.({
          settings: {
            enabledMethods: { audioChord: false },
            volume: { chord: 0.5 },
          },
        } as any) ?? {
          settings: {
            enabledMethods: { audioChord: false },
            volume: { chord: 0.5 },
          },
        }
    );

    render(<BreathingAudio phase="inhale" />);
    expect(audioInitialized).toBe(false);
    expect(audioStarted).toBe(false);
  });

  it("sets correct frequency for inhale phase", () => {
    render(<BreathingAudio phase="inhale" />);
    expect(currentFrequency).toBe(392.0); // G4
  });

  it("respects volume settings", () => {
    const testVolume = 0.7;
    jest.spyOn(breathingStore, "useBreathingStore").mockImplementation(
      (selector) =>
        selector?.({
          settings: {
            enabledMethods: { audioChord: true },
            volume: { chord: testVolume },
          },
        } as any) ?? {
          settings: {
            enabledMethods: { audioChord: true },
            volume: { chord: testVolume },
          },
        }
    );

    render(<BreathingAudio phase="inhale" />);
    expect(currentVolume).toBe(testVolume);
  });
});
