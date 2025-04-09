![Social Card of this repo](https://github.com/stacksjs/vite-plugin-tauri/blob/main/.github/art/cover.jpg?raw=true)

# Introduction

`vite-plugin-tauri` is a Vite plugin that seamlessly integrates with Tauri to help you build desktop applications with web technologies.

## Features

- **Auto Integration** - Automatically detects and initializes Tauri in your Vite project
- **Dev Mode** - Launches Tauri alongside your Vite dev server
- **Build Ready** - Seamlessly configures Tauri build with your Vite output directory
- **CLI Passthrough** - Pass arguments to Tauri CLI for advanced configuration
- **Zero Config** - Works out of the box with sensible defaults
- **Smart Detection** - Automatically detects your Tauri configuration file
- **Multi-Environment** - Works across different platforms and environments

> A Vite plugin to seamlessly integrate with Tauri for desktop application development.

## What is Tauri?

[Tauri](https://tauri.app/) is a framework for building tiny, blazingly fast binaries for all major desktop platforms. It allows developers to build applications for the major desktop platforms – using web technologies – bundled in a native shell for distribution.

This plugin integrates with Tauri to provide a seamless experience for Vite users, automatically initializing and configuring Tauri development and builds with your Vite project.

## How It Works

1. **Add the plugin to your Vite config** - Import and use the plugin in your Vite configuration
2. **Start your Vite dev server** - The plugin automatically launches Tauri alongside your Vite app
3. **Build your application** - When building your app, the plugin configures Tauri to use your Vite output directory

The plugin handles all the complexity of integration, making it easy to develop Tauri desktop applications with Vite.

## Environment Variables

- `TAURI_PATH_DEPTH` - Controls how deep the plugin searches for Tauri configuration files (default: `3`)

## CLI Arguments

You can pass arguments to the Tauri CLI by adding them after a double dash (`--`) and the `-t` or `--tauri` flag:

```bash
# Development mode
npm run dev -- -t --debug

# Build mode
npm run build -- -t --target nsis --debug
```

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## Credits

- [Tauri](https://tauri.app/) for creating a powerful desktop app framework
- [Chris Breuer](https://github.com/chrisbbreuer)
- [All Contributors](https://github.com/stacksjs/vite-plugin-tauri/contributors)

## License

The MIT License (MIT). Please see [LICENSE](/license) for more information.

Made with 💙
