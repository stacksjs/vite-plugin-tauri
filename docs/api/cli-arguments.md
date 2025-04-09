# CLI Arguments

The `vite-plugin-tauri` allows you to pass arguments directly to the Tauri CLI. This gives you access to all of Tauri's CLI options without having to invoke the Tauri CLI directly.

## Passing Arguments

To pass arguments to the Tauri CLI, add them after a double dash (`--`) and the `-t` or `--tauri` flag in your NPM scripts:

```bash
# Example
npm run dev -- -t --debug
```

## Development Mode Arguments

When running in development mode, you can pass arguments to the `tauri dev` command:

```bash
# Basic usage
npm run dev -- -t --debug

# Open developer tools automatically
npm run dev -- -t --debug --open
```

## Build Mode Arguments

When building your application, you can pass arguments to the `tauri build` command:

```bash
# Basic usage
npm run build -- -t --debug

# Build for a specific target
npm run build -- -t --target nsis

# Build for Apple Silicon
npm run build -- -t --target universal-apple-darwin
```

## Common Tauri CLI Arguments

Here are some common arguments you might want to use:

### Debug Mode

```bash
npm run dev -- -t --debug
```

Enables debug logging and developer tools.

### Target Platform

```bash
npm run build -- -t --target <target>
```

Specifies which target to build for. Options include:

- `window-pc` (Windows)
- `nsis` (Windows installer)
- `app-image` (Linux AppImage)
- `app-bundle` (macOS app bundle)
- `dmg` (macOS DMG installer)
- `universal-apple-darwin` (Universal macOS)

### Build Configuration

```bash
npm run build -- -t --config <config>
```

Specifies a custom configuration for building.

## Complete Tauri CLI Reference

For a complete list of available CLI arguments, refer to the [Tauri CLI documentation](https://tauri.app/v1/api/cli/).

You can also view the available options by running:

```bash
npx tauri --help
npx tauri dev --help
npx tauri build --help
```
