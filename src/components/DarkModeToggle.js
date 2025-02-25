"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarkModeToggle = DarkModeToggle;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var outline_1 = require("@heroicons/react/24/outline");
function DarkModeToggle() {
    var _a = (0, react_1.useState)(false), isDark = _a[0], setIsDark = _a[1];
    (0, react_1.useEffect)(function () {
        // Check initial dark mode preference
        var isDarkMode = document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);
    }, []);
    var toggleDarkMode = function () {
        var newMode = !isDark;
        setIsDark(newMode);
        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        }
        else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
        }
    };
    return ((0, jsx_runtime_1.jsx)("button", { onClick: toggleDarkMode, className: "fixed top-4 right-4 p-2 rounded-full bg-breathing-neutral dark:bg-breathing-dark\n                text-breathing-dark dark:text-breathing-neutral\n                hover:bg-breathing-secondary dark:hover:bg-breathing-primary\n                transition-colors duration-200", "aria-label": "Toggle dark mode", children: isDark ? ((0, jsx_runtime_1.jsx)(outline_1.SunIcon, { className: "w-6 h-6" })) : ((0, jsx_runtime_1.jsx)(outline_1.MoonIcon, { className: "w-6 h-6" })) }));
}
