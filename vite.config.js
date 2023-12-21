import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const moduleExclude = match => {
  const m = id => id.indexOf(match) > -1
  return {
    name: `exclude-${match}`,
    resolveId(id) {
      if (m(id)) return id
    },
    load(id) {
      if (m(id)) return `export default {}`
    },
  }
}

export default defineConfig({
  plugins: [
    vue(),
    moduleExclude('text-encoding'),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: [
      'gun',
      'gun/gun',
      'gun/sea',
      'gun/sea.js',
      'gun/lib/then',
      'gun/lib/webrtc',
      'gun/lib/radix',
      'gun/lib/radisk',
      'gun/lib/store',
      'gun/lib/rindexed',
    ],
  },
})

// First is the fact that vite pre-bundles the dependencies, 
// so you can't import something from inside of them. 
// That's exactly what we do when we import SEA from 'gun/sea' and all the gun/libs too. 
// So you need to add a list of included optimized dependencies to vite.config.js 
// for vite to know that you'll need their insides.