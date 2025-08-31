import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    // If deploying to GitHub Pages, set base to repo name
    // Otherwise (like Netlify), keep root "/"
    base: mode === "gh-pages" ? "/scholars-haven/" : "/",
    plugins: [react()],
  };
});
