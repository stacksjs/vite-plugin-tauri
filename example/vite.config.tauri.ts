import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { tauri } from 'vite-plugin-tauri'
import baseViteConfig from './vite.config'

// https://vitejs.dev/config
export default defineConfig(
  mergeConfig(baseViteConfig, {
    plugins: [
      tauri({
        systemTray: {
          enabled: true,
          // The following options are now configured directly in tauri.conf.json
          // menuOnLeftClick: true,
          // useAppIcon: true
        },
      }),
    ],
    clearScreen: false,
    server: {
      open: false,
    },
  }),
) as UserConfig
