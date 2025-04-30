import type { PluginOption, ResolvedConfig } from 'vite'
import type { TauriConfig } from './types'
import path from 'node:path'
import process from 'node:process'
import TauriCli from '@tauri-apps/cli'
import fg from 'fast-glob'
import { getPackageInfoSync } from 'local-pkg'
import { confirm, getPackageJson } from './utils'

/**
 * Finds the Tauri configuration file in the project.
 * Searches for tauri.conf.json, tauri.conf.json5, or Tauri.toml files.
 *
 * @returns The absolute path to the Tauri configuration file or null if not found
 */
function getTauriConfPath(): string | null {
  const tauriDepthEnv = process.env.TAURI_PATH_DEPTH
  const deep = tauriDepthEnv ? Number.parseInt(tauriDepthEnv) : 3

  return fg.sync('**/(tauri.conf.(json|json5)|Tauri.toml)', {
    absolute: true,
    unique: true,
    ignore: ['**/node_modules/**', '**/target/**'],
    deep,
  })[0]
}

const tauriVersion = Number(
  getPackageInfoSync('@tauri-apps/cli')?.version?.split('.')[0] ?? 2,
)

/**
 * Initializes a new Tauri project if one doesn't exist.
 * Prompts the user for confirmation before initialization.
 *
 * @throws Will exit the process if the user declines initialization
 */
async function initTauri(): Promise<void> {
  const confirmed = await confirm(
    'Couldn\'t find a Tauri project in current directory, would you like to initialize a new one?',
  )

  if (!confirmed)
    process.exit(0)

  // eslint-disable-next-line no-console
  console.log('Initializing Tauri...')

  try {
    const pkgName = getPackageJson().name
    await TauriCli.run(
      [
        'init',
        '--app-name',
        pkgName ?? 'tauri-app',
        '--window-title',
        `${pkgName ?? 'tauri-app'} window`,
        tauriVersion === 1 ? '--dist-dir' : '--frontend-dist',
        `Injected by vite-plugin-tauri, you can change this if you want to use tauri cli directly`,
        tauriVersion === 1 ? '--dev-path' : '--dev-url',
        `Injected: by vite-plugin-tauri, you can change this if you want to use tauri cli directly`,
      ],
      'vite-tauri',
    )

    // eslint-disable-next-line no-console
    console.log('Tauri initialized.')
  }
  catch (error) {
    console.error('Failed to initialize Tauri:', error)
    process.exit(1)
  }
}

/**
 * Parses command line arguments to extract Tauri-specific arguments.
 *
 * @param args - The command line arguments array
 * @returns An array of Tauri-specific arguments or null if none found
 */
function parseTauriArgs(args: string[]): string[] | null {
  const lastDoubleDash = args.lastIndexOf('--')
  if (lastDoubleDash !== -1) {
    const tauriArg = args.includes('-t', lastDoubleDash)
      ? args.indexOf('-t', lastDoubleDash)
      : args.indexOf('--tauri', lastDoubleDash)

    const tauriArgs = tauriArg !== -1 ? args.slice(tauriArg + 1) : null

    return tauriArgs
  }

  return null
}

/**
 * Vite plugin for Tauri integration.
 * Provides seamless integration between Vite and Tauri for development and building.
 *
 * @param config - Configuration object for the plugin
 * @returns Vite plugin options
 */
export function tauri(config?: TauriConfig): PluginOption {
  let viteConfig: ResolvedConfig

  // Process the system tray configuration
  const systemTrayEnabled = config?.systemTray?.enabled ?? false
  // These options are now handled differently in Tauri 2.x
  // const menuOnLeftClick = config?.systemTray?.menuOnLeftClick ?? true
  // const useAppIcon = config?.systemTray?.useAppIcon ?? true

  // In Tauri 2.x, tray features are set via the app feature flag, not passed directly
  // const tauriFeatures = systemTrayEnabled ? ['tray-icon'] : []

  // We'll skip adding the features flag since it's handled in Cargo.toml

  return [
    {
      name: 'vite-plugin-tauri:serve',
      apply: 'serve',
      enforce: 'post',
      configResolved(config) {
        viteConfig = config
      },
      async configureServer(server) {
        if (!getTauriConfPath())
          await initTauri()

        server.httpServer?.once('listening', () => {
          const localhosts = [
            'localhost',
            '127.0.0.1',
            '::1',
            '0000:0000:0000:0000:0000:0000:0000:0001',
          ]

          const address = server.httpServer?.address()
          if (!address) {
            console.error('Dev server is not running')
            return
          }

          if (typeof address === 'string') {
            console.error('Unexpected dev server address format:', address)
            return
          }

          const protocol = server.config.server.https ? 'https' : 'http'
          const host = localhosts.includes(address.address)
            ? 'localhost'
            : address.address
          const port = address.port

          try {
            let args = parseTauriArgs(process.argv) ?? []
            if (!args.includes('dev') && !args.includes('build')) {
              args = ['dev', ...args]
            }

            let tauriConfig: any = {
              build: {
                [tauriVersion === 1 ? 'devPath' : 'devUrl']:
                  `${protocol}://${host}:${port}`,
              },
            }

            // Add system tray configuration if enabled
            if (systemTrayEnabled) {
              tauriConfig = {
                ...tauriConfig,
                app: {
                  security: {
                    capabilities: [
                      {
                        identifier: 'systemTray',
                        description: 'Lets app custom configuration for System tray, and menu options',
                        windows: ['main'],
                        permissions: [
                          'core:tray:default',
                          'core:menu:default',
                          'core:app:allow-default-window-icon',
                          'core:image:allow-from-path',
                          'core:event:allow-listen',
                          'core:webview:allow-create-webview',
                          'core:webview:allow-create-webview-window',
                          'core:window:allow-hide',
                          'core:window:allow-create',
                          'positioner:default',
                          'core:window:allow-show',
                          'core:webview:allow-webview-show',
                          'core:window:allow-is-visible',
                          'core:window:allow-get-all-windows',
                          'core:window:allow-is-focused',
                          'core:window:allow-set-position',
                        ],
                      },
                    ],
                  },
                },
              }
            }

            args = [
              ...args,
              '--config',
              JSON.stringify(tauriConfig),
            ]

            // Add features if any are specified
            // if (tauriFeatures.length > 0) {
            //   args = [
            //     ...args,
            //     '--features',
            //     tauriFeatures.join(','),
            //   ]
            // }

            TauriCli.run(args, 'vite-plugin-tauri')
          }
          catch (error) {
            console.error('Failed to run Tauri CLI:', error)
          }
        })
      },
    },
    {
      name: 'vite-plugin-tauri:build',
      apply: 'build',
      enforce: 'post',
      configResolved(config) {
        viteConfig = config
      },
      async closeBundle() {
        try {
          let tauriConfPath = getTauriConfPath()
          if (!tauriConfPath) {
            await initTauri()
            tauriConfPath = getTauriConfPath()

            if (!tauriConfPath) {
              throw new Error('Failed to locate Tauri configuration file after initialization')
            }
          }

          let args = parseTauriArgs(process.argv) ?? []
          if (!args.includes('dev') && !args.includes('build')) {
            args = ['build', ...args]
          }

          let tauriConfig: any = {
            build: {
              [tauriVersion === 1 ? 'distDir' : 'frontendDist']: path.relative(
                path.dirname(tauriConfPath),
                path.resolve(viteConfig.build.outDir),
              ),
            },
          }

          // Add system tray configuration if enabled
          if (systemTrayEnabled) {
            tauriConfig = {
              ...tauriConfig,
              app: {
                security: {
                  capabilities: [
                    {
                      identifier: 'systemTray',
                      description: 'Lets app custom configuration for System tray, and menu options',
                      windows: ['main'],
                      permissions: [
                        'core:tray:default',
                        'core:menu:default',
                        'core:app:allow-default-window-icon',
                        'core:image:allow-from-path',
                        'core:event:allow-listen',
                        'core:webview:allow-create-webview',
                        'core:webview:allow-create-webview-window',
                        'core:window:allow-hide',
                        'core:window:allow-create',
                        'positioner:default',
                        'core:window:allow-show',
                        'core:webview:allow-webview-show',
                        'core:window:allow-is-visible',
                        'core:window:allow-get-all-windows',
                        'core:window:allow-is-focused',
                        'core:window:allow-set-position',
                      ],
                    },
                  ],
                },
              },
            }
          }

          args = [
            ...args,
            '--config',
            JSON.stringify(tauriConfig),
          ]

          // Add features if any are specified
          // if (tauriFeatures.length > 0) {
          //   args = [
          //     ...args,
          //     '--features',
          //     tauriFeatures.join(','),
          //   ]
          // }

          await TauriCli.run(args, 'vite-plugin-tauri')
        }
        catch (error) {
          console.error('Failed to build Tauri application:', error)
          throw error
        }
      },
    },
  ]
}
