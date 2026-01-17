import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    assetsInlineLimit: 0, // لا تحول الملفات الكبيرة لـ base64
  },
  // تأكد من نسخ الملفات صح
  publicDir: "public",
});
