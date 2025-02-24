import { render, screen, fireEvent } from "@testing-library/react";
import { CompletionCelebration } from "../CompletionCelebration";

// Mock canvas-confetti with a more complete mock
jest.mock("canvas-confetti", () => ({
  __esModule: true,
  default: jest.fn(),
  reset: jest.fn(),
}));

describe("CompletionCelebration", () => {
  it("renders congratulatory message", () => {
    render(<CompletionCelebration onClose={() => {}} />);
    expect(screen.getByText("Great job!")).toBeInTheDocument();
  });

  it("displays an inspirational quote", () => {
    render(<CompletionCelebration onClose={() => {}} />);
    // Find the quote container by its class
    const quoteContainer = screen.getByTestId("quote-container");
    expect(quoteContainer).toHaveClass("min-h-[120px]");
  });

  it("calls onClose when continue button is clicked", () => {
    const mockOnClose = jest.fn();
    render(<CompletionCelebration onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Continue"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
