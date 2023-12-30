import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";
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
      nodePolyfills({
        exclude: [
          "_stream_duplex",
          "_stream_passthrough",
          "_stream_readable",
          "_stream_transform",
          "_stream_writable",
          "assert",
          "cluster",
          "console",
          "constants",
          "crypto",
          "dgram",
          "dns",
          "domain",
          "events",
          "http2",
          "net",
          "punycode",
          "querystring",
          "readline",
          "repl",
          "string_decoder",
          "sys",
          "timers",
          "timers/promises",
        ],
        include: [
          "os",
          "stream",
          "buffer",
          "fs",
          "http",
          "https",
          "path",
          "process",
          "child_process",
          "module",
        ],
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        overrides: {
          fs: "memfs",
          promise: "es6-promise",
          fetch: "whatwg-fetch",
        },
        protocolImports: true,
      }),
    ],
  };
});
