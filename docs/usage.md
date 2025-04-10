# Usage

Using the vite-plugin-tauri is straightforward and integrates seamlessly with your Vite development workflow.

## Development Mode

Once you've added the plugin to your Vite configuration, simply run your normal Vite development command:

```bash
npm run dev
```

The plugin will:

1. Check if a Tauri configuration file exists in your project
2. If not found, prompt you to initialize a new Tauri project
3. Launch the Tauri development environment alongside your Vite dev server
4. Connect your Vite app to the Tauri window

This creates a fluid development experience where changes to your frontend code are instantly reflected in the Tauri application.

## Build Mode

When you're ready to build your application, run your normal Vite build command:

```bash
npm run build
```

The plugin will:

1. First build your Vite application
2. Configure Tauri to use your Vite build output directory
3. Build the Tauri application with your app bundled inside

The final build artifacts will be available in the `src-tauri/target/release` directory (or similar, depending on your Tauri configuration).

## CLI Passthrough

For advanced usage, you can pass arguments directly to the Tauri CLI by adding them after a double dash (`--`) and the `-t` or `--tauri` flag:

```bash
# Development mode with debugging enabled
npm run dev -- -t --debug

# Build mode with specific features
npm run build -- -t --features custom-protocol

# Build with a specific target
npm run build -- -t --target x86_64-pc-windows-msvc
```

All arguments after the `-t` or `--tauri` flag will be passed directly to the Tauri CLI.

## Auto-initialization

If no Tauri project is detected when you run the development server, the plugin will prompt you to create one:

```
? Couldn't find a Tauri project in current directory, would you like to initialize a new one? (Y/n)
```

Press `Y` to initialize a new Tauri project with sensible defaults based on your package.json.

## Environment Variables

You can customize the plugin behavior with the following environment variables:

```bash
# Control how deep the plugin searches for Tauri configuration files (default: 3)
TAURI_PATH_DEPTH=5 npm run dev
```

## Common Development Tasks

### Adding Native Features

To add native features to your Tauri application, modify the `tauri.conf.json` (or similar) file located in your project.

### Setting Window Properties

Customize window properties in your Tauri configuration file:

```json
{
  "tauri": {
    "windows": [
      {
        "width": 800,
        "height": 600,
        "resizable": true,
        "fullscreen": false,
        "title": "My App"
      }
    ]
  }
}
```

### Testing

To run tests for your project:

```bash
bun test
```

Remember that any changes to your Tauri configuration will require restarting your development server for the changes to take effect.
