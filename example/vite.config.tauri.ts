import { defineConfig, mergeConfig } from 'vite'
import { tauri } from 'vite-plugin-tauri'
import baseViteConfig from './vite.config'
import type { UserConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig(
  mergeConfig(baseViteConfig, {
    plugins: [tauri()],
    clearScreen: false,
    server: {
      open: false,
    },
  }),
) as UserConfig
