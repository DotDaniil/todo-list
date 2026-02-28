import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/todo-list/",
  plugins: [react()],
  resolve: {
    alias: {
      entities: path.resolve(__dirname, "src/entities"),
      features: path.resolve(__dirname, "src/features"),
      shared: path.resolve(__dirname, "src/shared"),
      widgets: path.resolve(__dirname, "src/widgets"),
    },
  },
});
