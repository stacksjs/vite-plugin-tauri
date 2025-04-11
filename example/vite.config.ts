import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // rollupOptions: {
  //   output: {
  //     assetFileNames: 'assets/[name].[hash][extname]',
  //   },
  // },
  build: {
    rollupOptions: {
      external: ['@tauri-apps/api', '@tauri-apps/api/tray', '@tauri-apps/api/menu', '@tauri-apps/api/window'],
    },
  },
  plugins: [vue()],
}) as UserConfig
