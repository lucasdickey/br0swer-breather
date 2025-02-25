import { render, screen, fireEvent } from "@testing-library/react";
import { BreathingSettings } from "../BreathingSettings";
import { useBreathingStore } from "@/store/breathingStore";

jest.mock("../../store/breathingStore", () => ({
  useBreathingStore: jest.fn(),
}));

describe("BreathingSettings", () => {
  const mockUpdateSettings = jest.fn();

  beforeEach(() => {
    (useBreathingStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        settings: {
          cycleCount: 4,
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
        },
        updateSettings: mockUpdateSettings,
      })
    );
  });

  it("renders all feedback method toggles", () => {
    render(<BreathingSettings />);
    expect(screen.getByText(/visual/i)).toBeInTheDocument();
    expect(screen.getByText(/text/i)).toBeInTheDocument();
    expect(screen.getByText(/audio chord/i)).toBeInTheDocument();
    expect(screen.getByText(/audio voice/i)).toBeInTheDocument();
    expect(screen.getByText(/haptic/i)).toBeInTheDocument();
  });

  it("updates cycle count", () => {
    render(<BreathingSettings />);
    const input = screen.getByLabelText(/number of cycles/i);
    fireEvent.change(input, { target: { value: "5" } });
    expect(mockUpdateSettings).toHaveBeenCalledWith({ cycleCount: 5 });
  });

  it("updates volume settings", () => {
    render(<BreathingSettings />);
    const chordVolume = screen.getByLabelText(/chord volume/i);
    fireEvent.change(chordVolume, { target: { value: "0.7" } });
    expect(mockUpdateSettings).toHaveBeenCalledWith({
      volume: expect.objectContaining({ chord: 0.7 }),
    });
  });
});
