# Install

Installing `vite-plugin-tauri` is easy. Simply pull it in via your package manager of choice.

::: code-group

```bash [npm]
npm install --save-dev vite-plugin-tauri

# or, install via
# npm i -d vite-plugin-tauri
```

```bash [bun]
bun install --dev vite-plugin-tauri

# or, install via
# bun add --dev vite-plugin-tauri
# bun i -d vite-plugin-tauri
```

```bash [pnpm]
pnpm add --save-dev vite-plugin-tauri

# or, install via
# pnpm i -d vite-plugin-tauri
```

```bash [yarn]
yarn add --dev vite-plugin-tauri

# or, install via
# yarn i -d vite-plugin-tauri
```

:::

## Basic Usage

This minimal usage example shows how to use `vite-plugin-tauri` in your Vite configuration, using the plugin's default settings.

```javascript
// vite.config.{js,ts}
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import tauri from 'vite-plugin-tauri'

export default defineConfig({
  plugins: [
    vue(), // svelte(), react(), ...
    tauri(),
  ],
})
```

With this minimal configuration, the plugin will automatically:

1. Initialize Tauri if it doesn't exist in your project yet
2. Launch Tauri alongside your Vite development server
3. Configure Tauri to use your Vite output directory when building

For more advanced usage, check out the [usage](/usage) page in our documentation.

## Prerequisites

To use this plugin, you'll need:

1. [Node.js](https://nodejs.org/) (v23 or later) or [Bun](https://bun.sh/) (v1.2 or later)
2. A Vite project
3. [Rust](https://github.com/stacksjs/vite-plugin-tauri/blob/b96c1da902fd7a6167adcb0aaaa2a5e84da74cfd/pkgx.yaml) _(and consequent Cargo)_ installed

If you have any issues, free free to reach out on [Discord](https://discord.gg/stacksjs).
