import { createMenu } from '@stacksjs/vite-plugin-tauri'
import { app, window } from '@tauri-apps/api'
import { TrayIcon } from '@tauri-apps/api/tray'
// import { Menu } from '@tauri-apps/api/menu'

/**
 * Initialize the system tray icon and menu
 */
export async function initTray() {
  try {
    // eslint-disable-next-line no-console
    console.log('Initializing system tray...')

    const appWindow = window.getCurrentWindow()

    // Create a simple menu for the tray with basic structure
    const menu = createMenu(appWindow)

    // Listen for menu item clicks
    await menu.onMenuItemClick((item) => {
      // eslint-disable-next-line no-console
      console.log(`Menu item clicked: ${item.id}`)

      if (item.id === 'show') {
        appWindow.show()
        appWindow.setFocus()
      }
      else if (item.id === 'hide') {
        appWindow.hide()
      }
      else if (item.id === 'quit') {
        app.exit()
      }
    })

    // Create the tray icon with minimal options
    const trayIcon = await TrayIcon.new({
      id: 'main-tray',
      menu,
      tooltip: 'Tauri Example App',
      iconAsTemplate: true,
    })

    // eslint-disable-next-line no-console
    console.log('System tray initialized with ID:', trayIcon.id)

    // Setup window close handler to minimize to tray instead of quitting
    appWindow.onCloseRequested(async (event) => {
      // eslint-disable-next-line no-console
      console.log('Window close requested, minimizing to tray instead')
      event.preventDefault()
      await appWindow.hide()
    })

    return trayIcon
  }
  catch (error) {
    console.error('Failed to initialize system tray:', error)
    throw error
  }
}
