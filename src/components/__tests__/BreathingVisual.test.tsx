import { render, screen } from "@testing-library/react";
import { BreathingVisual } from "../BreathingVisual";
import { BreathingPhase } from "@/types/breathing";

describe("BreathingVisual", () => {
  it("renders the visual element", () => {
    render(<BreathingVisual phase="inhale" progress={0} />);
    expect(screen.getByTestId("breathing-visual")).toBeInTheDocument();
  });

  describe("animations", () => {
    it.each([
      ["inhale", "animate-breathe-in"],
      ["exhale", "animate-breathe-out"],
      ["hold-in", "animate-hold"],
      ["hold-out", "animate-hold"],
    ])("applies %s animation class for %s phase", (phase, expectedClass) => {
      render(<BreathingVisual phase={phase as BreathingPhase} progress={0} />);
      const element = screen.getByTestId("breathing-visual");
      expect(element.className).toContain(expectedClass);
    });
  });

  describe("scaling", () => {
    it.each([
      ["inhale", 0, 0.5], // Start of inhale
      ["inhale", 0.5, 0.75], // Middle of inhale
      ["inhale", 1, 1], // End of inhale
      ["exhale", 0, 1], // Start of exhale
      ["exhale", 0.5, 0.75], // Middle of exhale
      ["exhale", 1, 0.5], // End of exhale
      ["hold-in", 0.5, 1], // Hold in is always 1
      ["hold-out", 0.5, 0.5], // Hold out is always 0.5
    ])(
      "scales correctly for %s phase at %s progress",
      (phase, progress, expectedScale) => {
        render(
          <BreathingVisual
            phase={phase as BreathingPhase}
            progress={progress as number}
          />
        );
        const element = screen.getByTestId("breathing-visual");
        expect(element).toHaveStyle(`transform: scale(${expectedScale})`);
      }
    );
  });
});
