# System Tray Applications

The `vite-plugin-tauri` plugin fully supports the development of system tray applications through Tauri's system tray API.

## Overview

System tray applications (also known as notification area icons or status menu icons) are small applications that run in the system tray/notification area of your operating system. They provide quick access to application functionality without needing a full application window open at all times.

## Setting Up a System Tray Application

To create a system tray application with Tauri, you'll need to configure it in your `tauri.conf.json` file:

```json
{
  "tauri": {
    "systemTray": {
      "iconPath": "icons/icon.png",
      "iconAsTemplate": true,
      "menuOnLeftClick": false
    }
  }
}
```

## System Tray API

Tauri provides a comprehensive API for managing your system tray application:

```typescript
import { trayIcon } from '@tauri-apps/api/tray'

// Set up the tray menu
await trayIcon.create({
  title: 'My App',
  tooltip: 'My Tauri App',
  menu: [
    {
      id: 'open',
      label: 'Open App',
      click: () => {
        // Open the main window
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      click: () => {
        // Open settings
      }
    },
    {
      type: 'separator'
    },
    {
      id: 'quit',
      label: 'Quit',
      click: () => {
        // Quit the application
      }
    }
  ]
})

// You can also update the tray menu dynamically
await trayIcon.setMenu([
  /* new menu items */
])

// Update the icon
await trayIcon.setIcon('icons/new-icon.png')

// Update the tooltip
await trayIcon.setTooltip('New tooltip')
```

## Cross-Platform Considerations

System tray applications behave differently across operating systems:

### Windows

- Supports left and right click menus
- Can display balloon notifications
- Tray icons are typically monochrome

### macOS

- Uses menu bar instead of system tray
- Template icons (monochrome) are recommended
- Only supports one click action (typically right-click)

### Linux

- Behavior varies by desktop environment
- Some desktop environments have limited system tray support
- May require additional configuration for some distributions

## Example: Simple System Tray Application

Here's a complete example of a simple system tray application:

```typescript
// main.ts
import { invoke } from '@tauri-apps/api/tauri'
import { trayIcon, TrayIconResponse } from '@tauri-apps/api/tray'
import { appWindow } from '@tauri-apps/api/window'

async function setupTray() {
  // Create the tray icon
  await trayIcon.create({
    icon: 'icon.png',
    title: 'My Tray App',
    tooltip: 'My Awesome Tray App',
    menu: [
      {
        id: 'toggle',
        label: 'Show/Hide Window',
        click: async () => {
          const visible = await appWindow.isVisible()
          if (visible) {
            await appWindow.hide()
          }
          else {
            await appWindow.show()
            await appWindow.setFocus()
          }
        }
      },
      { type: 'separator' },
      {
        id: 'quit',
        label: 'Quit',
        click: () => {
          invoke('quit_app')
        }
      }
    ]
  })
}

// Set up the tray when the app starts
setupTray()
```

With the corresponding Rust command:

```rust
// main.rs
#[tauri::command]
fn quit_app() {
    std::process::exit(0);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![quit_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

## Best Practices

1. **Provide Clear Status**: Use the icon to indicate the application's status
2. **Simple Menu Structure**: Keep the tray menu simple and focused on common tasks
3. **Accessibility**: Ensure your application is usable without the tray icon if possible
4. **Exit Option**: Always provide a clear way to exit the application
5. **Platform Adaptation**: Adapt your tray behavior based on the user's platform
