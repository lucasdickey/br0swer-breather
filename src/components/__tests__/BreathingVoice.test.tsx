import { render } from "@testing-library/react";
import { BreathingVoice } from "../BreathingVoice";
import { mockBreathingStore } from "../../test/mockBreathingStore";

jest.mock("@/store/breathingStore", () => ({
  useBreathingStore: jest.fn(),
}));

describe("BreathingVoice", () => {
  beforeEach(() => {
    mockBreathingStore();
  });

  it("initializes without crashing", () => {
    const { container } = render(
      <BreathingVoice phase="inhale" secondsRemaining={4} />
    );
    expect(container).toBeTruthy();
  });

  it("respects voice enabled setting", () => {
    mockBreathingStore({
      settings: {
        enabledMethods: { audioVoice: false },
        volume: { voice: 0.5 },
        secondsPerPhase: 4,
        cycleCount: 4,
      },
    });

    const { container } = render(
      <BreathingVoice phase="inhale" secondsRemaining={4} />
    );
    expect(container).toBeTruthy();
  });
});
