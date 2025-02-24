# BR0SWER-BREATHER CODING GUIDE

## BUILD & TEST COMMANDS
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run all tests
- `npm test -- -t "ComponentName"` - Run specific component tests
- `npm test -- --watch` - Run tests in watch mode

## CODE STYLE
- Use TypeScript with strict type checking
- Import paths use `@/` alias (e.g., `import Component from "@/components/Component"`)
- Component files use PascalCase (e.g., `BreathingController.tsx`)
- Function components with named exports
- State management with Zustand
- Use React Testing Library with Jest for tests
- Always clean up side effects in useEffect returns
- Style with Tailwind CSS (organized by component section)
- Error handling: wrap async operations in try/catch blocks
- Prefer functional programming patterns (map, filter) over imperative loops