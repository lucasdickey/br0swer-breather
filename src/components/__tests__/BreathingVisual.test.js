"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var BreathingVisual_1 = require("../BreathingVisual");
describe("BreathingVisual", function () {
    it("renders the visual element", function () {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingVisual_1.BreathingVisual, { phase: "inhale", progress: 0 }));
        expect(react_1.screen.getByTestId("breathing-visual")).toBeInTheDocument();
    });
    describe("animations", function () {
        it.each([
            ["inhale", "animate-breathe-in"],
            ["exhale", "animate-breathe-out"],
            ["hold-in", "animate-hold"],
            ["hold-out", "animate-hold"],
        ])("applies %s animation class for %s phase", function (phase, expectedClass) {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingVisual_1.BreathingVisual, { phase: phase, progress: 0 }));
            var element = react_1.screen.getByTestId("breathing-visual");
            expect(element.className).toContain(expectedClass);
        });
    });
    describe("scaling", function () {
        it.each([
            ["inhale", 0, 0.5], // Start of inhale
            ["inhale", 0.5, 0.75], // Middle of inhale
            ["inhale", 1, 1], // End of inhale
            ["exhale", 0, 1], // Start of exhale
            ["exhale", 0.5, 0.75], // Middle of exhale
            ["exhale", 1, 0.5], // End of exhale
            ["hold-in", 0.5, 1], // Hold in is always 1
            ["hold-out", 0.5, 0.5], // Hold out is always 0.5
        ])("scales correctly for %s phase at %s progress", function (phase, progress, expectedScale) {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingVisual_1.BreathingVisual, { phase: phase, progress: progress }));
            var element = react_1.screen.getByTestId("breathing-visual");
            expect(element).toHaveStyle("transform: scale(".concat(expectedScale, ")"));
        });
    });
});
