import { TrayIcon } from '@tauri-apps/api/tray';
import { Menu } from '@tauri-apps/api/menu';
import { exit } from '@tauri-apps/api/process';
import { appWindow } from '@tauri-apps/api/window';

/**
 * Initialize the system tray icon and menu
 */
export async function initTray() {
  try {
    console.log('Initializing system tray...');

    // Create a simple menu for the tray
    const menu = await Menu.new({
      items: [
        {
          id: 'show',
          text: 'Show Window',
          action: async () => {
            console.log('Show window clicked');
            await appWindow.show();
            await appWindow.setFocus();
          }
        },
        {
          id: 'hide',
          text: 'Hide Window',
          action: async () => {
            console.log('Hide window clicked');
            await appWindow.hide();
          }
        },
        {
          type: 'separator'
        },
        {
          id: 'quit',
          text: 'Quit',
          action: () => {
            console.log('Quit clicked');
            exit(0);
          }
        }
      ]
    });

    // Create the tray icon
    const tray = await TrayIcon.new({
      menu,
      tooltip: 'Tauri Example App',
      showMenuOnLeftClick: true,
      action: (event) => {
        console.log('Tray event:', event.type);
      }
    });

    console.log('System tray initialized successfully');

    // Setup window close handler to minimize to tray instead of quitting
    appWindow.onCloseRequested(async (event) => {
      console.log('Window close requested, minimizing to tray instead');
      event.preventDefault();
      await appWindow.hide();
    });

    return tray;
  } catch (error) {
    console.error('Failed to initialize system tray:', error);
    throw error;
  }
}