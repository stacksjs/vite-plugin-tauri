# CLI Passthrough

vite-plugin-tauri provides a powerful CLI passthrough feature that allows you to send arguments directly to the Tauri CLI from your Vite commands.

## What is CLI Passthrough?

CLI passthrough enables you to pass command-line arguments from your Vite commands directly to the Tauri CLI, giving you access to all Tauri CLI features without needing to call the Tauri CLI directly.

## How to Use CLI Passthrough

To pass arguments to the Tauri CLI, add them after a double dash (`--`) followed by the `-t` or `--tauri` flag:

```bash
# Development mode with debug enabled
npm run dev -- -t --debug

# Build mode with specific features
npm run build -- -t --features custom-protocol,updater,clipboard

# Build for a specific target
npm run build -- -t --target x86_64-pc-windows-msvc
```

## How It Works

The plugin scans command line arguments for the `-t` or `--tauri` flag and passes all subsequent arguments to the Tauri CLI:

```typescript
function parseTauriArgs(args: string[]): string[] | null {
  const lastDoubleDash = args.lastIndexOf('--')
  if (lastDoubleDash !== -1) {
    const tauriArg = args.includes('-t', lastDoubleDash)
      ? args.indexOf('-t', lastDoubleDash)
      : args.indexOf('--tauri', lastDoubleDash)

    const tauriArgs = tauriArg !== -1 ? args.slice(tauriArg + 1) : null

    return tauriArgs
  }

  return null
}
```

## Common Use Cases

### Debugging

Enable Tauri's debug mode for more detailed logging:

```bash
npm run dev -- -t --debug
```

### Building for Specific Platforms

Target specific platforms for your build:

```bash
# Build for Windows
npm run build -- -t --target x86_64-pc-windows-msvc

# Build for macOS
npm run build -- -t --target x86_64-apple-darwin

# Build for Linux
npm run build -- -t --target x86_64-unknown-linux-gnu
```

### Enabling Features

Enable specific Tauri features:

```bash
npm run build -- -t --features custom-protocol,clipboard,updater
```

### Custom Icons

Specify custom icons for your application:

```bash
npm run build -- -t --icon ./path/to/icon.png
```

### Verbose Output

Get detailed output from the Tauri build process:

```bash
npm run build -- -t --verbose
```

## Development vs. Build Arguments

Some arguments are only applicable during development (`npm run dev`) or building (`npm run build`). Here's a quick reference:

### Development-Only Arguments

- `--no-watch`: Disable file watching
- `--no-dev-server`: Don't start a development server

### Build-Only Arguments

- `--debug`: Build in debug mode instead of release
- `--target <triple>`: Build for a specific platform
- `--bundles <formats>`: Build specific bundle formats

## Best Practices

- Use the CLI passthrough for temporary or one-off options
- For persistent configuration, prefer the Tauri configuration file
- Embed commonly used CLI options in npm scripts for convenience:

  ```json
  {
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "build:windows": "vite build -- -t --target x86_64-pc-windows-msvc",
      "build:macos": "vite build -- -t --target x86_64-apple-darwin"
    }
  }
  ```

## Examples

### Development with Custom Port

```bash
npm run dev -- -t --port 3000
```

### Building with Custom Configuration

```bash
npm run build -- -t --config '{"tauri":{"bundle":{"identifier":"com.example.custom"}}}'
```

### Building a Debug Version

```bash
npm run build -- -t --debug
```

### Building with Specific Bundle Types

```bash
npm run build -- -t --bundles deb,appimage
```

CLI passthrough gives you the flexibility to customize your Tauri application development and build process directly from your Vite commands.
