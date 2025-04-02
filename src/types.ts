/**
 * Interface for the Tauri plugin configuration.
 *
 * @interface TauriConfig
 */
export interface TauriConfig {
  /**
   * Additional configuration options for the Tauri plugin.
   * This is currently kept flexible for future extensions.
   */
  [key: string]: unknown
}
