"use strict";
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
var BreathingAudio_1 = require("../BreathingAudio");
var breathingStore = __importStar(require("@/store/breathingStore"));
// Mock the store module
jest.mock("@/store/breathingStore", function () { return ({
    useBreathingStore: jest.fn(),
}); });
describe("BreathingAudio", function () {
    // Track if audio was initialized
    var audioInitialized = false;
    var audioStarted = false;
    var currentFrequency = 0;
    var currentVolume = 0;
    // Mock minimal AudioContext behavior
    beforeEach(function () {
        audioInitialized = false;
        audioStarted = false;
        currentFrequency = 0;
        currentVolume = 0;
        // Mock store with default enabled state
        jest.spyOn(breathingStore, "useBreathingStore").mockImplementation(function (selector) {
            var _a;
            return (_a = selector === null || selector === void 0 ? void 0 : selector({
                settings: {
                    enabledMethods: { audioChord: true },
                    volume: { chord: 0.5 },
                },
            })) !== null && _a !== void 0 ? _a : {
                settings: {
                    enabledMethods: { audioChord: true },
                    volume: { chord: 0.5 },
                },
            };
        });
        // Mock AudioContext
        global.AudioContext = jest.fn().mockImplementation(function () {
            audioInitialized = true;
            return {
                createOscillator: function () { return ({
                    connect: jest.fn(),
                    frequency: {
                        get value() {
                            return currentFrequency;
                        },
                        set value(v) {
                            currentFrequency = v;
                        },
                    },
                    start: function () {
                        audioStarted = true;
                    },
                    disconnect: jest.fn(),
                    stop: jest.fn(),
                }); },
                createGain: function () { return ({
                    connect: jest.fn(),
                    gain: {
                        get value() {
                            return currentVolume;
                        },
                        set value(v) {
                            currentVolume = v;
                        },
                    },
                }); },
                destination: {},
            };
        });
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    it("initializes audio when enabled", function () {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingAudio_1.BreathingAudio, { phase: "inhale" }));
        expect(audioInitialized).toBe(true);
        expect(audioStarted).toBe(true);
    });
    it("does not initialize audio when disabled", function () {
        jest.spyOn(breathingStore, "useBreathingStore").mockImplementation(function (selector) {
            var _a;
            return (_a = selector === null || selector === void 0 ? void 0 : selector({
                settings: {
                    enabledMethods: { audioChord: false },
                    volume: { chord: 0.5 },
                },
            })) !== null && _a !== void 0 ? _a : {
                settings: {
                    enabledMethods: { audioChord: false },
                    volume: { chord: 0.5 },
                },
            };
        });
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingAudio_1.BreathingAudio, { phase: "inhale" }));
        expect(audioInitialized).toBe(false);
        expect(audioStarted).toBe(false);
    });
    it("sets correct frequency for inhale phase", function () {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingAudio_1.BreathingAudio, { phase: "inhale" }));
        expect(currentFrequency).toBe(392.0); // G4
    });
    it("respects volume settings", function () {
        var testVolume = 0.7;
        jest.spyOn(breathingStore, "useBreathingStore").mockImplementation(function (selector) {
            var _a;
            return (_a = selector === null || selector === void 0 ? void 0 : selector({
                settings: {
                    enabledMethods: { audioChord: true },
                    volume: { chord: testVolume },
                },
            })) !== null && _a !== void 0 ? _a : {
                settings: {
                    enabledMethods: { audioChord: true },
                    volume: { chord: testVolume },
                },
            };
        });
        (0, react_1.render)((0, jsx_runtime_1.jsx)(BreathingAudio_1.BreathingAudio, { phase: "inhale" }));
        expect(currentVolume).toBe(testVolume);
    });
});
