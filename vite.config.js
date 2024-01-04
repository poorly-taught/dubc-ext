import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import vue from "@vitejs/plugin-vue";
import manifest from "./src/manifest.js";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const production = mode === "production";
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js",
        },
      },
    },
    plugins: [
      crx({ manifest }),
      vue(),
    ],
    protocolImports: true,
    server: {
      host: 'localhost',
      port: 5173,
      strictPort: true,
      hrm: {
        clientPort: 5173
      }
    },
  };
});
