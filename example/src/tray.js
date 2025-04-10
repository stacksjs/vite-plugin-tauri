import { Menu } from '@tauri-apps/api/menu'
import { exit } from '@tauri-apps/api/process'
import { TrayIcon } from '@tauri-apps/api/tray'
import { appWindow } from '@tauri-apps/api/window'

/**
 * Initialize the system tray icon and menu
 */
export async function initTray() {
  try {
    // eslint-disable-next-line no-console
    console.log('Initializing system tray...')

    // Create a simple menu for the tray
    const menu = await Menu.new({
      items: [
        {
          id: 'show',
          text: 'Show Window',
          action: async () => {
            // eslint-disable-next-line no-console
            console.log('Show window clicked')
            await appWindow.show()
            await appWindow.setFocus()
          },
        },
        {
          id: 'hide',
          text: 'Hide Window',
          action: async () => {
            // eslint-disable-next-line no-console
            console.log('Hide window clicked')
            await appWindow.hide()
          },
        },
        {
          type: 'separator',
        },
        {
          id: 'quit',
          text: 'Quit',
          action: () => {
            // eslint-disable-next-line no-console
            console.log('Quit clicked')
            exit(0)
          },
        },
      ],
    })

    // Create the tray icon
    const tray = await TrayIcon.new({
      menu,
      tooltip: 'Tauri Example App',
      showMenuOnLeftClick: true,
      action: (event) => {
        // eslint-disable-next-line no-console
        console.log('Tray event:', event.type)
      },
    })

    // eslint-disable-next-line no-console
    console.log('System tray initialized successfully')

    // Setup window close handler to minimize to tray instead of quitting
    appWindow.onCloseRequested(async (event) => {
      // eslint-disable-next-line no-console
      console.log('Window close requested, minimizing to tray instead')
      event.preventDefault()
      await appWindow.hide()
    })

    return tray
  }
  catch (error) {
    console.error('Failed to initialize system tray:', error)
    throw error
  }
}
