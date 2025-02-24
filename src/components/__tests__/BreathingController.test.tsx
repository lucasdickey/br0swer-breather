import { render, screen, fireEvent, act } from "@testing-library/react";
import { BreathingController } from "../BreathingController";
import { mockBreathingStore } from "../../test/mockBreathingStore";
import * as breathingStore from "@/store/breathingStore";

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
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("renders initial state correctly", () => {
    const store = mockBreathingStore();
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    expect(screen.getByText(/cycle 1 of/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });

  it("starts breathing cycle when start button is clicked", () => {
    const store = mockBreathingStore();
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    fireEvent.click(screen.getByRole("button", { name: /start/i }));

    expect(store.start).toHaveBeenCalled();
  });

  it("progresses to next phase when timer reaches zero", () => {
    const store = mockBreathingStore({
      isActive: true,
      secondsRemaining: 1,
    });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(store.nextPhase).toHaveBeenCalled();
  });

  it("updates timer during phase", () => {
    const store = mockBreathingStore({
      isActive: true,
      secondsRemaining: 4,
    });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(store.updateTimer).toHaveBeenCalledWith(3);
  });

  it("stops when cycle count is exceeded", () => {
    const store = mockBreathingStore({
      isActive: true,
      currentCycle: 5,
      settings: { cycleCount: 4 },
    });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(store.stop).toHaveBeenCalled();
  });

  it("stops breathing cycle when stop button is clicked", () => {
    const store = mockBreathingStore({ isActive: true });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    fireEvent.click(screen.getByRole("button", { name: /stop/i }));

    expect(store.stop).toHaveBeenCalled();
  });

  it("cleans up interval timer on unmount", () => {
    const store = mockBreathingStore({ isActive: true });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    const { unmount } = render(<BreathingController />);
    unmount();

    // Advance time to verify timer doesn't fire
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(store.updateTimer).not.toHaveBeenCalled();
  });

  it("calculates visual progress correctly", () => {
    const store = mockBreathingStore({
      isActive: true,
      secondsRemaining: 3,
      settings: { secondsPerPhase: 4 },
    });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    const visual = screen.getByTestId("mock-visual");

    // Progress should be 1 - (3/4) = 0.25
    expect(visual).toHaveAttribute("progress", "0.25");
  });
});
