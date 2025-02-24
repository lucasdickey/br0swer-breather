import { render, screen, fireEvent, act } from "@testing-library/react";
import { BreathingController } from "../BreathingController";
import { mockBreathingStore } from "../../test/mockBreathingStore";

// Mock child components
jest.mock("../BreathingVisual", () => ({
  BreathingVisual: () => <div data-testid="mock-visual" />,
}));

jest.mock("../BreathingAudio", () => ({
  BreathingAudio: () => null,
}));

jest.mock("../BreathingVoice", () => ({
  BreathingVoice: () => null,
}));

jest.mock("../BreathingSettings", () => ({
  BreathingSettings: () => <div data-testid="mock-settings" />,
}));

jest.mock("../DarkModeToggle", () => ({
  DarkModeToggle: () => <div data-testid="mock-dark-mode" />,
}));

jest.mock("../CompletionCelebration", () => ({
  CompletionCelebration: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="mock-celebration" onClick={onClose} />
  ),
}));

describe("BreathingController", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockBreathingStore();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("renders initial state correctly", () => {
    render(<BreathingController />);
    expect(screen.getByText(/cycle 1 of/i)).toBeInTheDocument();
    expect(screen.getByText(/start/i)).toBeInTheDocument();
  });

  it("starts breathing cycle when start button is clicked", () => {
    const store = mockBreathingStore();
    render(<BreathingController />);

    fireEvent.click(screen.getByText(/start/i));
    expect(store.start).toHaveBeenCalled();
  });

  it("progresses through breathing phases", () => {
    const store = mockBreathingStore({ isActive: true });
    render(<BreathingController />);

    // Fast-forward through one phase
    act(() => {
      jest.advanceTimersByTime(4000); // Default phase duration
    });

    expect(store.updatePhase).toHaveBeenCalled();
  });
});
