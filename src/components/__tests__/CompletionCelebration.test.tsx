import { render, screen, fireEvent } from "@testing-library/react";
import { CompletionCelebration } from "../CompletionCelebration";

// Mock canvas-confetti
jest.mock("canvas-confetti", () => ({
  __esModule: true,
  default: jest.fn(),
  reset: jest.fn(),
}));

describe("CompletionCelebration", () => {
  it("renders congratulatory message", () => {
    const onClose = jest.fn();
    render(<CompletionCelebration onClose={onClose} />);
    expect(screen.getByText("Great job!")).toBeInTheDocument();
  });

  it("displays a quote", () => {
    const onClose = jest.fn();
    render(<CompletionCelebration onClose={onClose} />);
    const quoteContainer = screen.getByTestId("quote-container");
    expect(quoteContainer).toBeInTheDocument();
    expect(quoteContainer.textContent).not.toBe("");
  });

  it("calls onClose when continue button is clicked", () => {
    const onClose = jest.fn();
    render(<CompletionCelebration onClose={onClose} />);
    fireEvent.click(screen.getByText("Continue"));
    expect(onClose).toHaveBeenCalled();
  });
});
