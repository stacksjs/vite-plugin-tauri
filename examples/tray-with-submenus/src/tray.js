import { window } from '@tauri-apps/api'
import { defaultWindowIcon } from '@tauri-apps/api/app'
import { Image } from '@tauri-apps/api/image'
import { CheckMenuItem, IconMenuItem, Menu, MenuItem, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'

/**
 * Initialize the system tray icon and menu
 */
export async function initTray() {
  try {
    // eslint-disable-next-line no-console
    console.log('Initializing system tray...')

    const appWindow = window.getCurrentWindow()

    const icon = await Image.fromPath('../public/icon.png')

    const separator = await PredefinedMenuItem.new({
      text: 'separator-text',
      item: 'Separator',
    })

    const checkMenuItem = await CheckMenuItem.new({
      id: 'en',
      text: 'Check Menu Item',
      checked: true,
      action: () => {
        // eslint-disable-next-line no-console
        console.log('Check Menu Item Clicked')
      },
    })

    const iconMenuItem = await IconMenuItem.new({
      id: 'icon_item',
      text: 'Icon Menu Item',
      icon,
      action: () => {
        // eslint-disable-next-line no-console
        console.log('icon pressed')
      },
    })

    const fileSubmenu = await Submenu.new({
      text: 'File',
      items: [
        await MenuItem.new({
          id: 'new',
          text: 'New',
          action: () => {
            // eslint-disable-next-line no-console
            console.log('New clicked')
          },
        }),
        await MenuItem.new({
          id: 'open',
          text: 'Open',
          action: () => {
            // eslint-disable-next-line no-console
            console.log('Open clicked')
          },
        }),
        await MenuItem.new({
          id: 'save_as',
          text: 'Save As...',
          action: () => {
            // eslint-disable-next-line no-console
            console.log('Save As clicked')
          },
        }),
      ],
    })

    const editSubmenu = await Submenu.new({
      text: 'Edit',
      items: [
        await MenuItem.new({
          id: 'undo',
          text: 'Undo',
          action: () => {
            // eslint-disable-next-line no-console
            console.log('Undo clicked')
          },
        }),
        await MenuItem.new({
          id: 'redo',
          text: 'Redo',
          action: () => {
            // eslint-disable-next-line no-console
            console.log('Redo clicked')
          },
        }),
      ],
    })

    const menu = await Menu.new({
      items: [
        checkMenuItem,
        separator,
        fileSubmenu,
        separator,
        editSubmenu,
        separator,
        iconMenuItem,
        await MenuItem.new({
          id: 'quit',
          text: 'Quit',
          action: () => {
            // eslint-disable-next-line no-console
            console.log('Quit pressed')
          },
        }),
      ],
    })

    // Create the tray icon with minimal options
    const trayIcon = await TrayIcon.new({
      id: 'submenu-tray',
      menu,
      icon: await defaultWindowIcon(),
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
