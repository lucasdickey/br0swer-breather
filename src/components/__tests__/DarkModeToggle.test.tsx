import { render, screen, fireEvent } from "@testing-library/react";
import { DarkModeToggle } from "../DarkModeToggle";

describe("DarkModeToggle", () => {
  beforeEach(() => {
    // Clear localStorage and document classes before each test
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("toggles dark mode when clicked", () => {
    render(<DarkModeToggle />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("darkMode")).toBe("true");

    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("darkMode")).toBe("false");
  });
});
