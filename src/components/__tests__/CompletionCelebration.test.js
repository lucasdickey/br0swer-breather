"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var CompletionCelebration_1 = require("../CompletionCelebration");
// Mock canvas-confetti
jest.mock("canvas-confetti", function () { return ({
    __esModule: true,
    default: jest.fn(),
    reset: jest.fn(),
}); });
describe("CompletionCelebration", function () {
    it("renders congratulatory message", function () {
        var onClose = jest.fn();
        (0, react_1.render)((0, jsx_runtime_1.jsx)(CompletionCelebration_1.CompletionCelebration, { onClose: onClose }));
        expect(react_1.screen.getByText("Great job!")).toBeInTheDocument();
    });
    it("displays a quote", function () {
        var onClose = jest.fn();
        (0, react_1.render)((0, jsx_runtime_1.jsx)(CompletionCelebration_1.CompletionCelebration, { onClose: onClose }));
        var quoteContainer = react_1.screen.getByTestId("quote-container");
        expect(quoteContainer).toBeInTheDocument();
        expect(quoteContainer.textContent).not.toBe("");
    });
    it("calls onClose when continue button is clicked", function () {
        var onClose = jest.fn();
        (0, react_1.render)((0, jsx_runtime_1.jsx)(CompletionCelebration_1.CompletionCelebration, { onClose: onClose }));
        react_1.fireEvent.click(react_1.screen.getByText("Continue"));
        expect(onClose).toHaveBeenCalled();
    });
});
