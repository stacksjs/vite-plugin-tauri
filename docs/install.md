# Install

Installing `vite-plugin-tauri` is easy. Simply pull it in via your package manager of choice, or download the binary directly.

## Package Managers

Choose your package manager of choice:

::: code-group

```sh [npm]
npm install --save-dev @stacksjs/vite-plugin-tauri
# npm i -d @stacksjs/vite-plugin-tauri

# or, install globally via
npm i -g @stacksjs/vite-plugin-tauri
```

```sh [bun]
bun install --dev @stacksjs/vite-plugin-tauri
# bun add --dev @stacksjs/vite-plugin-tauri
# bun i -d @stacksjs/vite-plugin-tauri

# or, install globally via
bun add --global @stacksjs/vite-plugin-tauri
```

```sh [pnpm]
pnpm add --save-dev @stacksjs/vite-plugin-tauri
# pnpm i -d @stacksjs/vite-plugin-tauri

# or, install globally via
pnpm add --global @stacksjs/vite-plugin-tauri
```

```sh [yarn]
yarn add --dev @stacksjs/vite-plugin-tauri
# yarn i -d @stacksjs/vite-plugin-tauri

# or, install globally via
yarn global add @stacksjs/vite-plugin-tauri
```

```sh [brew]
brew install vite-plugin-tauri # coming soon
```

```sh [pkgx]
pkgx vite-plugin-tauri # coming soon
```

:::

## Requirements

Before using `vite-plugin-tauri`, make sure you have:

1. `rust` (and Cargo) installed and available in your PATH

### Installing Rust

In case you are not using `pkgx`, you can install Rust using your package manager of choice:

```sh
# macOS
brew install rust

# Ubuntu/Debian
sudo apt install rust

# Windows (using Chocolatey)
choco install rust
```
