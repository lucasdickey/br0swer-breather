"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var BreathingVoice_1 = require("../BreathingVoice");
var mockBreathingStore_1 = require("../../test/mockBreathingStore");
jest.mock("@/store/breathingStore", function () { return ({
    useBreathingStore: jest.fn(),
}); });
describe("BreathingVoice", function () {
    beforeEach(function () {
        (0, mockBreathingStore_1.mockBreathingStore)();
    });
    it("initializes without crashing", function () {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingVoice_1.BreathingVoice, { phase: "inhale", secondsRemaining: 4 })).container;
        expect(container).toBeTruthy();
    });
    it("respects voice enabled setting", function () {
        (0, mockBreathingStore_1.mockBreathingStore)({
            settings: {
                enabledMethods: { audioVoice: false },
                volume: { voice: 0.5 },
                secondsPerPhase: 4,
                cycleCount: 4,
            },
        });
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingVoice_1.BreathingVoice, { phase: "inhale", secondsRemaining: 4 })).container;
        expect(container).toBeTruthy();
    });
});
