<p align="center"><img src="https://github.com/stacksjs/vite-plugin-tauri/blob/main/.github/art/cover.jpg?raw=true" alt="Social Card of vite-plugin-tauri"></p>

# vite-plugin-tauri

A Vite plugin to seamlessly integrate with Tauri for desktop and mobile app development.

## Features

- 🔄 **Auto Integration** - Automatically initializes and integrates Tauri with your Vite project
- 🛠️ **Dev Mode** - Launches Tauri alongside your Vite dev server
- 📦 **Build Ready** - Configures Tauri build with your Vite output directory
- 🧰 **CLI Passthrough** - Supports passing Tauri CLI arguments for advanced configurations
- 🌐 **Multi-Environment** - Works across different platforms with proper configuration
- 💼 **Zero Config** - Works out of the box with sensible defaults
- 🧠 **Smart Detection** - Automatically detects your Tauri configuration file

## Get Started

It's very simple to get started:

```bash
# Install the plugin
npm install -D @stacksjs/vite-plugin-tauri

# Add to your Vite config
```

```ts
// vite.config.ts
import Tauri from '@stacksjs/vite-plugin-tauri'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Tauri()
  ]
})
```

That's it! When you run your Vite development server, Tauri will automatically be initialized if not already present, and will launch alongside your Vite app.

## Developer Experience (DX)

This package comes pre-configured with the following:

- [Powerful Build Process](https://github.com/oven-sh/bun) - via Bun
- [Fully Typed APIs](https://www.typescriptlang.org/) - via TypeScript
- [Documentation-ready](https://vitepress.dev/) - via VitePress
- [Be a Good Commitizen](https://www.npmjs.com/package/git-cz) - pre-configured Commitizen & git-cz setup
- [Built With Testing In Mind](https://bun.sh/docs/cli/test) - pre-configured unit-testing
- [ESLint](https://eslint.org/) - for code linting
- [GitHub Actions](https://github.com/features/actions) - runs your CI

## Changelog

Please see our [releases](https://github.com/stacksjs/vite-plugin-tauri/releases) page for more information on what has changed recently.

## Contributing

Please review the [Contributing Guide](https://github.com/stacksjs/contributing) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/vite-plugin-tauri/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

"Software that is free, but hopes for a postcard." We love receiving postcards from around the world showing where Stacks is being used! We showcase them on our website too.

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094, United States 🌎

## Credits

- [Tauri](https://tauri.app/) for creating a powerful desktop app framework
- [Chris Breuer](https://github.com/chrisbbreuer)
- [All Contributors](https://github.com/stacksjs/vite-plugin-tauri/contributors)

## License

The MIT License (MIT). Please see [LICENSE](/license) for more information.

Made with 💙

<!-- Badges -->

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/stacksjs/rpx/main?style=flat-square
[codecov-href]: https://codecov.io/gh/stacksjs/rpx -->
