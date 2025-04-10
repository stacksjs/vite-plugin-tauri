/**
 * Interface for the Tauri plugin configuration.
 *
 * @interface TauriConfig
 */
export interface TauriConfig {
  /**
   * System tray configuration options
   */
  systemTray?: {
    /**
     * Enable system tray support
     * @default false
     */
    enabled?: boolean

    /**
     * Enable menu on left click
     * @default true
     */
    menuOnLeftClick?: boolean

    /**
     * Use the app icon as the tray icon
     * @default true
     */
    useAppIcon?: boolean
  }

  /**
   * Additional configuration options for the Tauri plugin.
   * This is currently kept flexible for future extensions.
   */
  [key: string]: unknown
}
