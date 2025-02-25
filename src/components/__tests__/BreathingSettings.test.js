"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var BreathingSettings_1 = require("../BreathingSettings");
var breathingStore_1 = require("@/store/breathingStore");
jest.mock("@/store/breathingStore", function () { return ({
    useBreathingStore: jest.fn(),
}); });
describe("BreathingSettings", function () {
    var mockUpdateSettings = jest.fn();
    beforeEach(function () {
        breathingStore_1.useBreathingStore.mockImplementation(function (selector) {
            return selector({
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
            });
        });
    });
    it("renders all feedback method toggles", function () {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingSettings_1.BreathingSettings, {}));
        expect(react_1.screen.getByText(/visual/i)).toBeInTheDocument();
        expect(react_1.screen.getByText(/text/i)).toBeInTheDocument();
        expect(react_1.screen.getByText(/audio chord/i)).toBeInTheDocument();
        expect(react_1.screen.getByText(/audio voice/i)).toBeInTheDocument();
        expect(react_1.screen.getByText(/haptic/i)).toBeInTheDocument();
    });
    it("updates cycle count", function () {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingSettings_1.BreathingSettings, {}));
        var input = react_1.screen.getByLabelText(/number of cycles/i);
        react_1.fireEvent.change(input, { target: { value: "5" } });
        expect(mockUpdateSettings).toHaveBeenCalledWith({ cycleCount: 5 });
    });
    it("updates volume settings", function () {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingSettings_1.BreathingSettings, {}));
        var chordVolume = react_1.screen.getByLabelText(/chord volume/i);
        react_1.fireEvent.change(chordVolume, { target: { value: "0.7" } });
        expect(mockUpdateSettings).toHaveBeenCalledWith({
            volume: expect.objectContaining({ chord: 0.7 }),
        });
    });
});
