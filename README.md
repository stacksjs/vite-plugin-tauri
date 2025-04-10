<p align="center"><img src=".github/art/cover.jpg" alt="Social Card of this repo"></p>

[![npm version][npm-version-src]][npm-version-href]
[![GitHub Actions][github-actions-src]][github-actions-href]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

# vite-plugin-tauri

> A Vite plugin to seamlessly integrate with Tauri.

## Features

- 🔄 **Auto Integration** _Automatically initializes and integrates Tauri with your Vite project_
- 🛠️ **Dev Mode** _Launches Tauri alongside your Vite dev server_
- 📦 **Build Ready** _Configures Tauri build with your Vite output directory_
- 🧰 **CLI Passthrough** _Supports passing Tauri CLI arguments for advanced configurations_
- 🌐 **Multi-Environment** _Works across different platforms with proper configuration_
- 💼 **Zero Config** _Works out of the box with sensible defaults_
- 🧠 **Smart Detection** _Automatically detects your Tauri configuration file_
- 🔍 **System Tray** _Easily add system tray functionality to your desktop applications_

## Install

```bash
npm install -D @stacksjs/vite-plugin-tauri
# or
yarn add -D @stacksjs/vite-plugin-tauri
# or
pnpm add -D @stacksjs/vite-plugin-tauri
# or
bun add -D @stacksjs/vite-plugin-tauri
```

## Get Started

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Tauri from 'vite-plugin-tauri'

export default defineConfig({
  plugins: [
    Tauri()
  ]
})
```

That's it! When you run your Vite development server, Tauri will automatically be initialized if not already present, and will launch alongside your Vite app.

## Configuration

The plugin accepts an optional configuration object. Here's an example with available options:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Tauri from 'vite-plugin-tauri'

export default defineConfig({
  plugins: [
    Tauri({
      // System tray configuration
      systemTray: {
        enabled: true, // Enable system tray support
        menuOnLeftClick: true, // Show menu on left click (default: true)
        useAppIcon: true // Use the app icon as the tray icon (default: true)
      }
    })
  ]
})
```

## CLI Arguments

You can pass arguments to the Tauri CLI by adding them after a double dash (`--`) and the `-t` or `--tauri` flag:

```bash
# Development mode
npm run dev -- -t --debug

# Build mode
npm run build -- -t --debug
```

## Environment Variables

- `TAURI_PATH_DEPTH`: Controls how deep the plugin searches for Tauri configuration files. Default is `3`.

## Usage with Tauri

This plugin works with [Tauri](https://tauri.app/), a framework for building desktop applications with web technologies.

### Initializing a Tauri Project

If you don't have a Tauri project initialized in your directory, the plugin will automatically prompt you to create one when you run your Vite dev server:

```bash
npm run dev
```

### Tauri Configuration

The plugin will automatically find your Tauri configuration file (`tauri.conf.json`, `tauri.conf.json5`, or `Tauri.toml`) and use it to configure the integration.

### Tauri CLI

For advanced Tauri configuration, you can use the Tauri CLI directly. The plugin is designed to work alongside the CLI without conflicts.

For more information on Tauri, visit [tauri.app](https://tauri.app/).

## Testing

```bash
bun test
```

## Changelog

Please see our [releases](https://github.com/stacksjs/vite-plugin-tauri/releases) page for more information on what has changed recently.

## Contributing

Please review the [Contributing Guide](https://github.com/stacksjs/contributing) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/stacks/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

“Software that is free, but hopes for a postcard.” We love receiving postcards from around the world showing where `vite-plugin-tauri` is being used! We showcase them on our website too.

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094, United States 🌎

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## Credits

- [Tauri](https://tauri.app/) for creating a powerful desktop app framework
- [Chris Breuer](https://github.com/chrisbbreuer)
- [All Contributors](https://github.com/stacksjs/vite-plugin-tauri/contributors)

## License

The MIT License (MIT). Please see [LICENSE](https://github.com/stacksjs/stacks/tree/main/LICENSE.md) for more information.

Made with 💙

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@stacksjs/vite-plugin-tauri?style=flat-square
[npm-version-href]: https://npmjs.com/package/@stacksjs/vite-plugin-tauri
[github-actions-src]: https://img.shields.io/github/actions/workflow/status/stacksjs/vite-plugin-tauri/ci.yml?style=flat-square&branch=main
[github-actions-href]: https://github.com/stacksjs/vite-plugin-tauri/actions?query=workflow%3Aci

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/stacksjs/vite-plugin-tauri/main?style=flat-square
[codecov-href]: https://codecov.io/gh/stacksjs/vite-plugin-tauri -->
