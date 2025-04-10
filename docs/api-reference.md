# API Reference

vite-plugin-tauri provides a TypeScript API for integrating Tauri with Vite projects.

## Installation

```bash
npm install -D @stacksjs/vite-plugin-tauri
```

## Basic Usage

```typescript
import Tauri from '@stacksjs/vite-plugin-tauri'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Tauri()
  ]
})
```

## API Types

### TauriConfig

```typescript
interface TauriConfig {
  /**
   * System tray configuration options
   */
  systemTray?: {
    /**
     * Enable system tray support
     * @default false
     */
    enabled?: boolean

    /**
     * Enable menu on left click
     * @default true
     */
    menuOnLeftClick?: boolean

    /**
     * Use the app icon as the tray icon
     * @default true
     */
    useAppIcon?: boolean
  }

  /**
   * Additional configuration options for the Tauri plugin.
   * This is currently kept flexible for future extensions.
   */
  [key: string]: unknown
}
```

## Main Function

### tauri

Initializes the Tauri plugin for Vite integration.

```typescript
function tauri(config?: TauriConfig): PluginOption
```

Parameters:

- `config` (optional): Configuration object for the plugin

Returns:

- `PluginOption`: A Vite plugin configuration object

## Utility Functions

The plugin utilizes several utility functions internally:

### getTauriConfPath

Finds the Tauri configuration file in the project.

```typescript
function getTauriConfPath(): string | null
```

Returns:

- `string | null`: The absolute path to the Tauri configuration file or null if not found

### initTauri

Initializes a new Tauri project if one doesn't exist.

```typescript
async function initTauri(): Promise<void>
```

Prompts the user for confirmation before initialization and exits the process if the user declines.

### parseTauriArgs

Parses command line arguments to extract Tauri-specific arguments.

```typescript
function parseTauriArgs(args: string[]): string[] | null
```

Parameters:

- `args`: The command line arguments array

Returns:

- `string[] | null`: An array of Tauri-specific arguments or null if none found

## Examples

### Basic Vite.config.js

```typescript
import Tauri from '@stacksjs/vite-plugin-tauri'
import Vue from '@vitejs/plugin-vue'
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Vue(),
    Tauri()
  ]
})
```

### With React

```typescript
import Tauri from '@stacksjs/vite-plugin-tauri'
import React from '@vitejs/plugin-react'
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    React(),
    Tauri()
  ]
})
```

### With System Tray

```typescript
import Tauri from '@stacksjs/vite-plugin-tauri'
import React from '@vitejs/plugin-react'
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    React(),
    Tauri({
      systemTray: {
        enabled: true,
        menuOnLeftClick: true,
        useAppIcon: true
      }
    })
  ]
})
```

### With Other Vite Plugins

```typescript
import Tauri from '@stacksjs/vite-plugin-tauri'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Vue(),
    Components(),
    AutoImport(),
    Tauri()
  ]
})
```

::: tip
The Tauri plugin should typically be ordered after other Vite plugins to ensure proper integration.
:::

::: warning
Remember that this plugin is designed to work with Vite's plugin system. It is not a standalone tool.
:::
