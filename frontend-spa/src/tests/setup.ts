import '@testing-library/jest-dom/vitest';

// Mock scrollIntoView to avoid jsdom errors in some components
Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: () => {},
});


