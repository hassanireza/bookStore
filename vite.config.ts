import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// Repo name — used as the base path for GitHub Pages project sites
// (https://<user>.github.io/bookStore/). Override with the
// VITE_BASE_PATH env var for local builds or a different deployment target.
const REPO_NAME = 'bookStore'

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? `/${REPO_NAME}/`,
  plugins: [react(), svgr()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
  },
})
