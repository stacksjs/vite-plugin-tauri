# Usage

Using this plugin is as simple as defining it in your Vite configuration.

```ts
// vite.config.{ts,js}
import { defineConfig } from 'vite'
import tauri from 'vite-plugin-tauri'

export default defineConfig({
  plugins: [
    tauri({
      // Configuration options (reserved for future use)
    })
  ]
})
```

## Automatic Initialization

One of the key features of this plugin is automatic Tauri initialization. If you don't already have a Tauri configuration in your project, the plugin will prompt you to create one when you start your Vite development server:

```bash
npm run dev
```

You'll see a prompt asking if you want to initialize Tauri. If you accept, the plugin will automatically set up Tauri in your project.

## Development Mode

In development mode, the plugin:

1. Automatically detects your Tauri configuration
2. Launches Tauri alongside your Vite development server
3. Configures Tauri to use your Vite dev server URL

This creates a seamless development experience where your Vite app is automatically loaded in the Tauri window.

## Build Mode

When you build your project:

```bash
npm run build
```

The plugin:

1. Builds your Vite application
2. Configures Tauri to use your Vite output directory
3. Triggers the Tauri build process

This results in a binary that includes your Vite application bundled with Tauri.

## CLI Arguments

You can pass arguments to the Tauri CLI by adding them after a double dash (`--`) and the `-t` or `--tauri` flag:

```bash
# Development mode with debug enabled
npm run dev -- -t --debug

# Build for a specific target
npm run build -- -t --target nsis

# Using other Tauri CLI arguments
npm run build -- -t --target universal-apple-darwin --debug
```

This allows you to use all of Tauri's CLI options directly from your Vite scripts.

## Environment Variables

- `TAURI_PATH_DEPTH`: Controls how deep the plugin searches for Tauri configuration files. Default is `3`.

## Configuration File

The plugin automatically searches for Tauri configuration files in your project. It looks for:

- `tauri.conf.json`
- `tauri.conf.json5`
- `Tauri.toml`

The search starts in your project root and can go as deep as specified by the `TAURI_PATH_DEPTH` environment variable.

## Working with Tauri

### Tauri Configuration

For detailed configuration of your Tauri application, you'll need to modify your Tauri configuration file (`tauri.conf.json` or equivalent). See the [Tauri configuration guide](https://tauri.app/v1/api/config/) for more information.

### Using Tauri APIs

To use Tauri APIs in your application, you'll need to install the Tauri client package:

```bash
npm install @tauri-apps/api
```

Then you can import and use the APIs in your application:

```js
import { invoke } from '@tauri-apps/api/tauri'

// Call a command defined in Rust
invoke('greet', { name: 'World' })
  .then(response => console.log(response))
```

For more information on using Tauri APIs, see the [Tauri API documentation](https://tauri.app/v1/api/js/).
