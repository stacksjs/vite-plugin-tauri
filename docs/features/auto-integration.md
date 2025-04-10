# Auto Integration

One of the key features of vite-plugin-tauri is its seamless auto-integration with your Vite project.

## What is Auto Integration?

Auto integration means the plugin automatically detects if a Tauri project exists in your workspace and, if not, offers to initialize one for you. This eliminates the need for manual setup steps and configuration to get Tauri working with your Vite application.

## How It Works

When you run your Vite dev server with the plugin installed:

1. The plugin searches for a Tauri configuration file (`tauri.conf.json`, `tauri.conf.json5`, or `Tauri.toml`) in your project
2. If no configuration is found, the plugin prompts you to initialize a new Tauri project
3. If you confirm, the plugin automatically initializes a new Tauri project with sensible defaults

```
? Couldn't find a Tauri project in current directory, would you like to initialize a new one? (Y/n)
```

## Project Initialization

When a new Tauri project is initialized, the plugin:

1. Creates a `src-tauri` directory with the necessary Rust project structure
2. Generates a default Tauri configuration file with appropriate values based on your `package.json`
3. Sets up the development and build paths to connect with your Vite application

## Project Detection

The plugin searches for Tauri configuration files using the following logic:

```typescript
function getTauriConfPath(): string | null {
  const tauriDepthEnv = process.env.TAURI_PATH_DEPTH
  const deep = tauriDepthEnv ? Number.parseInt(tauriDepthEnv) : 3

  return fg.sync('**/(tauri.conf.(json|json5)|Tauri.toml)', {
    absolute: true,
    unique: true,
    ignore: ['**/node_modules/**', '**/target/**'],
    deep,
  })[0]
}
```

This will search up to a configurable depth (default: 3 levels deep) in your project directory for any Tauri configuration files, excluding the `node_modules` and `target` directories.

## Customizing Detection Depth

You can customize how deep the plugin searches for Tauri configuration files by setting the `TAURI_PATH_DEPTH` environment variable:

```bash
# Search up to 5 levels deep
TAURI_PATH_DEPTH=5 npm run dev
```

## Benefits

Auto integration provides several benefits:

- **Zero Configuration**: Get started with Tauri without manual setup
- **Automatic Defaults**: Generates sensible default configuration based on your project
- **Seamless Integration**: Works effortlessly with your existing Vite development workflow
- **Fast Startup**: No additional steps required to connect Vite and Tauri

## Example Workflow

A typical workflow with auto integration:

1. Add the plugin to your Vite config
2. Run `npm run dev`
3. Confirm the creation of a new Tauri project when prompted
4. Start developing your desktop application without any further configuration

This approach ensures you can focus on building your application rather than setting up infrastructure.
