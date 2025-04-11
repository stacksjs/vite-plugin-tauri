import type { TauriConfig } from './types'
import { loadConfig } from 'bunfig'

// eslint-disable-next-line antfu/no-top-level-await
export const config: TauriConfig = await loadConfig({
  name: 'tauri',
  defaultConfig: {
    systemTray: {
      // TODO: enable this with a sensible default
      enabled: false,
    },
  },
})
