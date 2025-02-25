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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockBreathingStore = exports.DEFAULT_SETTINGS = void 0;
exports.DEFAULT_SETTINGS = {
    cycleCount: 4,
    secondsPerPhase: 4,
    prepareSeconds: 3,
    enabledMethods: {
        visual: true,
        text: true,
        audioChord: true,
        audioVoice: true,
    },
    volume: {
        chord: 0.5,
        voice: 0.5,
    },
};
var mockBreathingStore = function (initialState) {
    if (initialState === void 0) { initialState = {}; }
    return (__assign({ isActive: false, currentPhase: "inhale", currentCycle: 1, secondsRemaining: 4, settings: exports.DEFAULT_SETTINGS, start: jest.fn(), stop: jest.fn(), updatePhase: jest.fn(), updateSettings: jest.fn(), updateTimer: jest.fn(), nextPhase: jest.fn() }, initialState));
};
exports.mockBreathingStore = mockBreathingStore;
