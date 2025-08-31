import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/scholars-haven/", // <-- add this line
  plugins: [react()],
});
