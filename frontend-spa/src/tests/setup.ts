import '@testing-library/jest-dom/vitest';

// Mock scrollIntoView to avoid jsdom errors in some components
Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: () => {},
});

// Polyfill/override matchMedia for Ant Design responsive components (force assign)
// @ts-ignore
window.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});


