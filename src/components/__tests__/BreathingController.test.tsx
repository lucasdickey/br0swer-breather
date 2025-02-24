import { render, screen, fireEvent } from "@testing-library/react";
import { BreathingController } from "../BreathingController";

// Mock the store
jest.mock("@/store/breathingStore", () => ({
  useBreathingStore: () => ({
    isActive: false,
    currentPhase: "inhale",
    currentCycle: 1,
    secondsRemaining: 4,
    settings: {
      cycleCount: 4,
      secondsPerPhase: 4,
      enabledMethods: {
        visual: true,
        text: true,
        audioChord: false,
        audioVoice: false,
        haptic: false,
      },
      volume: {
        chord: 0.5,
        voice: 0.5,
      },
    },
    start: jest.fn(),
    stop: jest.fn(),
    updatePhase: jest.fn(),
  }),
}));

describe("BreathingController", () => {
  it("renders the start button when inactive", () => {
    render(<BreathingController />);
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  it("displays the current phase", () => {
    render(<BreathingController />);
    expect(screen.getByText("INHALE")).toBeInTheDocument();
  });

  it("shows cycle information", () => {
    render(<BreathingController />);
    expect(screen.getByText("Cycle 1 of 4")).toBeInTheDocument();
  });
});
