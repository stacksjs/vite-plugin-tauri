# System Tray

vite-plugin-tauri provides built-in support for creating system tray applications with Tauri.

## What is System Tray?

A system tray (also known as notification area or status bar) is an area where small icons appear, typically in the corner of the desktop screen. Applications can use the system tray to provide quick access to their functionality without having a full window open.

## How to Enable System Tray Support

Enable system tray support in your Vite configuration:

```typescript
import Tauri from '@stacksjs/vite-plugin-tauri'
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Tauri({
      systemTray: {
        enabled: true, // Enable system tray support
        menuOnLeftClick: true, // Show menu on left click (default: true)
        useAppIcon: true // Use the app icon as the tray icon (default: true)
      }
    })
  ]
})
```

## Configuration Options

The plugin provides several configuration options for system tray functionality:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `false` | Enable system tray support |
| `menuOnLeftClick` | boolean | `true` | Show the menu when the tray icon is left-clicked |
| `useAppIcon` | boolean | `true` | Use the application icon as the tray icon |

## How It Works

When system tray support is enabled, the plugin:

1. Automatically adds the `tray-icon` feature to your Tauri application
2. Configures the system tray with your specified options
3. Passes the necessary configuration to Tauri during development and build

## Usage in Your Application

### JavaScript/TypeScript (Frontend)

Once the system tray is enabled, you can interact with it from your JavaScript/TypeScript code:

```typescript
import { Menu } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'

// Create a menu for the tray
const menu = await Menu.new({
  items: [
    {
      id: 'show',
      text: 'Show Window',
      action: () => {
        console.log('Show window clicked')
        // Your code to show the window
      }
    },
    {
      id: 'quit',
      text: 'Quit',
      action: () => {
        console.log('Quit clicked')
        // Your code to quit the application
      }
    }
  ]
})

// Set up tray icon with options
const tray = await TrayIcon.new({
  menu,
  tooltip: 'My Tauri App',
  // You can specify a custom icon here if useAppIcon is set to false
  // icon: '/path/to/icon.png',
  action: (event) => {
    // Handle tray icon events
    console.log('Tray event:', event.type)
  }
})
```

### Events

The system tray supports various events:

- `Click`: Triggered on single click (left, right, or middle button)
- `DoubleClick`: Triggered on double click
- `Enter`: When cursor enters the tray icon area
- `Move`: When cursor moves within the tray icon area
- `Leave`: When cursor leaves the tray icon area

### Custom Icons

If you set `useAppIcon` to `false`, you'll need to provide your own icon for the tray:

```typescript
import { readBinaryFile } from '@tauri-apps/api/fs'
import { TrayIcon } from '@tauri-apps/api/tray'

// Load an icon from your app's assets
const iconData = await readBinaryFile('icon.png')
const tray = await TrayIcon.new({
  icon: iconData,
  // other options...
})
```

## Platform-Specific Considerations

- **Windows**: System tray icons appear in the notification area of the taskbar
- **macOS**: System tray icons appear in the menu bar at the top of the screen
- **Linux**: System tray icons appear in the notification area, which varies by desktop environment

## Examples

### Minimizing to Tray

A common pattern is to minimize your application to the tray instead of closing it:

```typescript
import { Menu } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'
import { appWindow } from '@tauri-apps/api/window'

// Create the menu
const menu = await Menu.new({
  items: [
    {
      id: 'show',
      text: 'Show',
      action: async () => {
        const window = appWindow
        await window.show()
        await window.setFocus()
      }
    },
    {
      id: 'quit',
      text: 'Quit',
      action: () => {
        appWindow.close()
      }
    }
  ]
})

// Create the tray icon
const tray = await TrayIcon.new({
  menu,
  tooltip: 'My App',
})

// Listen for window close event
appWindow.onCloseRequested(async (event) => {
  // Prevent the window from closing
  event.preventDefault()
  // Hide the window instead
  await appWindow.hide()
})
```

### System Tray Only Application

You can also create applications that only show in the system tray without a main window:

```typescript
import { Menu } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'
import { WebviewWindow } from '@tauri-apps/api/window'

// Create and hide the main window on startup
const mainWindow = WebviewWindow.getByLabel('main')
await mainWindow.hide()

// Create tray with functionality to show window when needed
const menu = await Menu.new({
  items: [
    {
      id: 'settings',
      text: 'Settings',
      action: async () => {
        // Create a settings window when needed
        const settingsWindow = new WebviewWindow('settings', {
          url: 'settings.html',
          title: 'Settings',
          width: 600,
          height: 400,
        })
      }
    },
    {
      id: 'quit',
      text: 'Quit',
      action: () => {
        // Properly quit the application
        window.__TAURI__.process.exit(0)
      }
    }
  ]
})

// Create the tray icon
const tray = await TrayIcon.new({
  menu,
  tooltip: 'My Tray App',
})
```

## Best Practices

1. **Use clear icons** - Make sure your tray icon is recognizable at small sizes
2. **Keep the menu simple** - Avoid overloading the tray menu with too many options
3. **Provide tooltips** - Help users understand what your tray icon does
4. **Handle clicks** - Consider what happens when users click on the tray icon directly
5. **Test on all platforms** - System tray behavior can vary between operating systems
