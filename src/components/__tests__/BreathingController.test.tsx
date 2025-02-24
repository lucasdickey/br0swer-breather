import { render, screen, fireEvent, act } from "@testing-library/react";
import { BreathingController } from "../BreathingController";
import {
  mockBreathingStore,
  DEFAULT_SETTINGS,
} from "../../test/mockBreathingStore";
import * as breathingStore from "@/store/breathingStore";
import { BreathingSettings } from "@/types/breathing";

// Mock child components
jest.mock("../BreathingVisual", () => ({
  BreathingVisual: ({
    phase,
    progress,
  }: {
    phase: string;
    progress: number;
  }) => (
    <div
      data-testid="mock-visual"
      data-phase={phase}
      data-progress={progress}
    />
  ),
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

  it("renders cycle count selection when not active", () => {
    const store = mockBreathingStore({ isActive: false });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);

    expect(screen.getByText("Number of Cycles")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
  });

  it("starts with preparation phase when clicking start", () => {
    const store = mockBreathingStore({ isActive: false });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));

    expect(store.start).toHaveBeenCalled();
  });

  it("shows countdown during preparation phase", () => {
    const store = mockBreathingStore({
      isActive: true,
      currentPhase: "prepare",
      secondsRemaining: 3,
    });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    expect(screen.getByText("get ready (3)")).toBeInTheDocument();
  });

  it("progresses through phases correctly", () => {
    const store = mockBreathingStore({
      isActive: true,
      currentPhase: "prepare",
      secondsRemaining: 1,
    });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);

    // Progress through preparation
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(store.nextPhase).toHaveBeenCalled();
  });

  it("updates cycle count when selected", () => {
    const store = mockBreathingStore({ isActive: false });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    fireEvent.click(screen.getByRole("button", { name: "6" }));

    expect(store.updateSettings).toHaveBeenCalledWith({ cycleCount: 6 });
  });

  it("renders initial state correctly", () => {
    const store = mockBreathingStore();
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    expect(screen.getByText("Number of Cycles")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
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
      settings: {
        ...DEFAULT_SETTINGS,
        cycleCount: 4,
      },
    });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(store.stop).toHaveBeenCalled();
  });

  it("stops breathing cycle when stop button is clicked", () => {
    const store = mockBreathingStore({
      isActive: true,
      settings: DEFAULT_SETTINGS,
    });
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
      settings: {
        ...DEFAULT_SETTINGS,
        secondsPerPhase: 4,
      },
    });
    jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);

    render(<BreathingController />);
    const visual = screen.getByTestId("mock-visual");

    expect(visual).toHaveAttribute("data-progress", "0.25");
  });
});
