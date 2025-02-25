import "@testing-library/jest-dom/extend-expect";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveStyle(style: string): R;
      toHaveAttribute(attr: string, value?: string): R;
    }
  }
}
