# Configuration

The vite-plugin-tauri interacts with Tauri's configuration system, allowing you to customize your desktop application.

## Vite Plugin Configuration

While the plugin itself has minimal configuration options (designed to be zero-config), you can add it to your Vite config like this:

```ts
// vite.config.ts
import Tauri from '@stacksjs/vite-plugin-tauri'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Tauri({
      // Plugin configuration options (reserved for future use)
    })
  ]
})
```

## Tauri Configuration

The main configuration for your Tauri app is located in the `tauri.conf.json` (or `tauri.conf.json5` or `Tauri.toml`) file in your project. This file is automatically created when the plugin initializes a Tauri project.

Here's an example of a typical Tauri configuration:

```json
{
  "build": {
    "beforeDevCommand": "",
    "beforeBuildCommand": "",
    "devPath": "",
    "distDir": "../dist",
    "withGlobalTauri": true
  },
  "package": {
    "productName": "My Tauri App",
    "version": "0.1.0"
  },
  "tauri": {
    "allowlist": {
      "all": false,
      "shell": {
        "all": false,
        "open": true
      }
    },
    "bundle": {
      "active": true,
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/128x128@2x.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ],
      "identifier": "com.example.myapp",
      "targets": "all"
    },
    "security": {
      "csp": null
    },
    "updater": {
      "active": false
    },
    "windows": [
      {
        "fullscreen": false,
        "height": 600,
        "resizable": true,
        "title": "My Tauri App",
        "width": 800
      }
    ]
  }
}
```

::: tip
The plugin automatically manages the `build.devPath` and `build.distDir` values for you during development and build. You typically don't need to manually set these values.
:::

## Key Configuration Options

### Application Identity

```json
{
  "package": {
    "productName": "My Tauri App",
    "version": "0.1.0"
  }
}
```

- `productName`: The human-readable name of your application
- `version`: The version of your application

### Security Allowlist

Tauri follows a security-by-default approach where native features must be explicitly enabled:

```json
{
  "allowlist": {
    "all": false,
    "fs": {
      "all": true,
      "readFile": true,
      "writeFile": true,
      "readDir": true,
      "copyFile": true,
      "createDir": true,
      "removeDir": true,
      "removeFile": true,
      "renameFile": true
    },
    "dialog": {
      "all": true,
      "open": true,
      "save": true
    }
  }
}
```

### Window Configuration

Define properties for your application windows:

```json
{
  "windows": [
    {
      "fullscreen": false,
      "height": 600,
      "resizable": true,
      "title": "My Tauri App",
      "width": 800,
      "decorations": true,
      "transparent": false,
      "maximized": false,
      "visible": true
    }
  ]
}
```

### Bundle Options

Configure how your application is bundled for distribution:

```json
{
  "bundle": {
    "active": true,
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ],
    "identifier": "com.example.dev",
    "targets": ["deb", "msi", "dmg", "appimage"]
  }
}
```

## Environment Variables

The plugin respects the following environment variables:

- `TAURI_PATH_DEPTH`: Controls how deep the plugin searches for Tauri configuration files (default: `3`)

To learn more about configuring Tauri applications, refer to the [Tauri documentation](https://tauri.app/v1/api/config/).
