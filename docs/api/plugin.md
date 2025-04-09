# Plugin API Reference

The `vite-plugin-tauri` exposes a default function that returns a Vite plugin configuration. This API reference documents the available options and functionality.

## Basic Usage

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import tauri from 'vite-plugin-tauri'

export default defineConfig({
  plugins: [
    tauri()
  ]
})
```

## API

### `tauri(options?: TauriOptions)`

The main function exported by the plugin.

**Parameters:**

- `options` (optional): Configuration options for the plugin (currently reserved for future use)

**Returns:**

- `PluginOption[]`: An array of Vite plugins

## Configuration Options

Currently, the plugin does not accept any configuration options and is designed to work with sensible defaults. This may change in future versions as more features are added.

## Hooks

The plugin implements the following Vite hooks:

### Development Mode Hook

The `configureServer` hook is used to set up the Tauri development environment alongside the Vite dev server. It:

1. Checks for a Tauri configuration file
2. Initializes Tauri if necessary
3. Sets up a listener for the HTTP server's 'listening' event
4. Configures Tauri to use the dev server URL
5. Launches Tauri in development mode

### Build Mode Hook

The `closeBundle` hook is used to build the Tauri application after the Vite build is complete. It:

1. Checks for a Tauri configuration file
2. Initializes Tauri if necessary
3. Configures Tauri to use the Vite output directory
4. Triggers the Tauri build process

## Internal Functions

The plugin uses several internal functions:

### `getTauriConfPath()`

Searches for the Tauri configuration file in the project.

**Returns:**

- `string | null`: The absolute path to the Tauri configuration file or null if not found

### `initTauri()`

Initializes a new Tauri project if one doesn't exist.

### `parseTauriArgs(args: string[])`

Parses command line arguments to extract Tauri-specific arguments.

**Parameters:**

- `args`: Command line arguments

**Returns:**

- `string[] | null`: An array of Tauri-specific arguments or null if none found
