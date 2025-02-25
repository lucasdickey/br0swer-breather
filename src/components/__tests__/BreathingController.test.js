"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var BreathingController_1 = require("../BreathingController");
var mockBreathingStore_1 = require("../../test/mockBreathingStore");
var breathingStore = __importStar(require("@/store/breathingStore"));
// Mock child components
jest.mock("../BreathingVisual", function () { return ({
    BreathingVisual: function (_a) {
        var phase = _a.phase, progress = _a.progress;
        return ((0, jsx_runtime_1.jsx)("div", { "data-testid": "mock-visual", "data-phase": phase, "data-progress": progress }));
    },
}); });
jest.mock("../BreathingAudio", function () { return ({
    BreathingAudio: function () { return null; },
}); });
jest.mock("../BreathingVoice", function () { return ({
    BreathingVoice: function () { return null; },
}); });
jest.mock("../BreathingSettings", function () { return ({
    BreathingSettings: function () { return (0, jsx_runtime_1.jsx)("div", { "data-testid": "mock-settings" }); },
}); });
jest.mock("../DarkModeToggle", function () { return ({
    DarkModeToggle: function () { return (0, jsx_runtime_1.jsx)("div", { "data-testid": "mock-dark-mode" }); },
}); });
jest.mock("../CompletionCelebration", function () { return ({
    CompletionCelebration: function (_a) {
        var onClose = _a.onClose;
        return ((0, jsx_runtime_1.jsx)("div", { "data-testid": "mock-celebration", onClick: onClose }));
    },
}); });
describe("BreathingController", function () {
    beforeEach(function () {
        jest.useFakeTimers();
    });
    afterEach(function () {
        jest.useRealTimers();
        jest.clearAllMocks();
    });
    it("renders cycle count selection when not active", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({ isActive: false });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        expect(react_1.screen.getByText("Number of Cycles")).toBeInTheDocument();
        expect(react_1.screen.getByRole("button", { name: "4" })).toBeInTheDocument();
        expect(react_1.screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    });
    it("starts with preparation phase when clicking start", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({ isActive: false });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        react_1.fireEvent.click(react_1.screen.getByRole("button", { name: "Start" }));
        expect(store.start).toHaveBeenCalled();
    });
    it("shows countdown during preparation phase", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({
            isActive: true,
            currentPhase: "prepare",
            secondsRemaining: 3,
        });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        expect(react_1.screen.getByText("get ready (3)")).toBeInTheDocument();
    });
    it("progresses through phases correctly", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({
            isActive: true,
            currentPhase: "prepare",
            secondsRemaining: 1,
        });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        // Progress through preparation
        (0, react_1.act)(function () {
            jest.advanceTimersByTime(1000);
        });
        expect(store.nextPhase).toHaveBeenCalled();
    });
    it("updates cycle count when selected", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({ isActive: false });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        react_1.fireEvent.click(react_1.screen.getByRole("button", { name: "6" }));
        expect(store.updateSettings).toHaveBeenCalledWith({ cycleCount: 6 });
    });
    it("renders initial state correctly", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)();
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        expect(react_1.screen.getByText("Number of Cycles")).toBeInTheDocument();
        expect(react_1.screen.getByRole("button", { name: "4" })).toBeInTheDocument();
        expect(react_1.screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    });
    it("progresses to next phase when timer reaches zero", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({
            isActive: true,
            secondsRemaining: 1,
        });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        (0, react_1.act)(function () {
            jest.advanceTimersByTime(1000);
        });
        expect(store.nextPhase).toHaveBeenCalled();
    });
    it("updates timer during phase", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({
            isActive: true,
            secondsRemaining: 4,
        });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        (0, react_1.act)(function () {
            jest.advanceTimersByTime(1000);
        });
        expect(store.updateTimer).toHaveBeenCalledWith(3);
    });
    it("stops when cycle count is exceeded", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({
            isActive: true,
            currentCycle: 5,
            settings: __assign(__assign({}, mockBreathingStore_1.DEFAULT_SETTINGS), { cycleCount: 4 }),
        });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        (0, react_1.act)(function () {
            jest.advanceTimersByTime(1000);
        });
        expect(store.stop).toHaveBeenCalled();
    });
    it("stops breathing cycle when stop button is clicked", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({
            isActive: true,
            settings: mockBreathingStore_1.DEFAULT_SETTINGS,
        });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        react_1.fireEvent.click(react_1.screen.getByRole("button", { name: /stop/i }));
        expect(store.stop).toHaveBeenCalled();
    });
    it("cleans up interval timer on unmount", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({ isActive: true });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        var unmount = (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {})).unmount;
        unmount();
        // Advance time to verify timer doesn't fire
        (0, react_1.act)(function () {
            jest.advanceTimersByTime(1000);
        });
        expect(store.updateTimer).not.toHaveBeenCalled();
    });
    it("calculates visual progress correctly", function () {
        var store = (0, mockBreathingStore_1.mockBreathingStore)({
            isActive: true,
            secondsRemaining: 3,
            settings: __assign(__assign({}, mockBreathingStore_1.DEFAULT_SETTINGS), { secondsPerPhase: 4 }),
        });
        jest.spyOn(breathingStore, "useBreathingStore").mockReturnValue(store);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingController_1.BreathingController, {}));
        var visual = react_1.screen.getByTestId("mock-visual");
        expect(visual).toHaveAttribute("data-progress", "0.25");
    });
});
