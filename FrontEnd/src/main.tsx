import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Apply theme and font scale on initial load
(function applyInitialThemeAndFontScale() {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    const fontScale = localStorage.getItem("fontScale");
    document.documentElement.style.setProperty("--font-scale", fontScale ? fontScale : "1");
  }
})();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
