import { window } from '@tauri-apps/api'
import { defaultWindowIcon } from '@tauri-apps/api/app'
import { TrayIcon } from '@tauri-apps/api/tray'
import { Webview } from '@tauri-apps/api/webview'
import { Window } from '@tauri-apps/api/window'

/**
 * Initialize the system tray icon and menu
 */
export async function initTray() {
  try {
    // eslint-disable-next-line no-console
    console.log('Initializing system tray...')

    const appWindow = window.getCurrentWindow()

    // Create the tray icon with minimal options
    const trayIcon = await TrayIcon.new({
      id: 'main-tray',
      icon: await defaultWindowIcon(),
      tooltip: 'Tauri Example App',
      iconAsTemplate: true,
    })

    const trayKey = 'tray-window'
    const customTrayWindow = new Window(trayKey, {
      // parent: appWindow,
      // center: true,
      focus: true,
      decorations: false,
      resizable: false,
      height: 300,
      width: 400,
      skipTaskbar: true,
    })

    customTrayWindow.once('tauri://created', () => {
      // The window was created successfully
      // eslint-disable-next-line no-console
      console.log('Custom tray window created successfully')

      const webview = new Webview(customTrayWindow, trayKey, {
        url: '../index.html',
        height: 300,
        width: 400,
        x: 0,
        y: 0,
        devtools: true,
      })

      webview.once('tauri://created', () => {
        // The webview was created successfully
        // eslint-disable-next-line no-console
        console.log('Webview created successfully')
        customTrayWindow.show()
        webview.show()
      })
      webview.once('tauri://error', (e) => {
        // The webview encountered an error

        console.error('Webview error:', e)
      })
    })

    customTrayWindow.once('tauri://error', (e) => {
      // The window encountered an error

      console.error('Custom tray window error:', e)
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
