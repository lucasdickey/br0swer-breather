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
exports.useBreathingStore = void 0;
var zustand_1 = require("zustand");
var DEFAULT_SETTINGS = {
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
exports.useBreathingStore = (0, zustand_1.create)(function (set) { return ({
    // Initial state
    isActive: false,
    currentPhase: "inhale",
    currentCycle: 1,
    secondsRemaining: DEFAULT_SETTINGS.secondsPerPhase,
    settings: DEFAULT_SETTINGS,
    // Actions
    start: function () {
        return set({
            isActive: true,
            currentPhase: "prepare",
            currentCycle: 1,
            secondsRemaining: DEFAULT_SETTINGS.prepareSeconds,
        });
    },
    stop: function () {
        return set({
            isActive: false,
            currentCycle: 1,
            currentPhase: "inhale",
            secondsRemaining: DEFAULT_SETTINGS.secondsPerPhase,
        });
    },
    updatePhase: function (phase) { return set({ currentPhase: phase }); },
    updateSettings: function (newSettings) {
        return set(function (state) { return ({
            settings: __assign(__assign({}, state.settings), newSettings),
        }); });
    },
    updateTimer: function (secondsRemaining) { return set({ secondsRemaining: secondsRemaining }); },
    nextPhase: function () {
        return set(function (state) {
            var phases = [
                "prepare",
                "inhale",
                "hold-in",
                "exhale",
                "hold-out",
            ];
            var currentIndex = phases.indexOf(state.currentPhase);
            // If we're in prepare, go to inhale
            if (state.currentPhase === "prepare") {
                return {
                    currentPhase: "inhale",
                    secondsRemaining: state.settings.secondsPerPhase,
                };
            }
            // If we're in hold-out, go back to inhale and increment cycle
            if (state.currentPhase === "hold-out") {
                return {
                    currentPhase: "inhale",
                    currentCycle: state.currentCycle + 1,
                    secondsRemaining: state.settings.secondsPerPhase,
                };
            }
            // Otherwise, go to next phase
            var nextPhase = phases[currentIndex + 1];
            return {
                currentPhase: nextPhase,
                secondsRemaining: state.settings.secondsPerPhase,
            };
        });
    },
}); });
