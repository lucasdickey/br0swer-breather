"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var DarkModeToggle_1 = require("../DarkModeToggle");
describe("DarkModeToggle", function () {
    beforeEach(function () {
        // Clear localStorage and document classes before each test
        localStorage.clear();
        document.documentElement.classList.remove("dark");
    });
    it("toggles dark mode when clicked", function () {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(DarkModeToggle_1.DarkModeToggle, {}));
        var button = react_1.screen.getByRole("button");
        react_1.fireEvent.click(button);
        expect(document.documentElement.classList.contains("dark")).toBe(true);
        expect(localStorage.getItem("darkMode")).toBe("true");
        react_1.fireEvent.click(button);
        expect(document.documentElement.classList.contains("dark")).toBe(false);
        expect(localStorage.getItem("darkMode")).toBe("false");
    });
});
