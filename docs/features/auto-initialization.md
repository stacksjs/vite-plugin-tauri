# Auto Initialization

One of the key features of the `vite-plugin-tauri` plugin is its ability to automatically initialize Tauri in your project if it's not already set up.

## How It Works

When you start your Vite development server with the plugin enabled, it will:

1. Check if a Tauri configuration file (`tauri.conf.json`) exists in your project
2. If no configuration is found, it will prompt you to initialize Tauri
3. If you agree, it will run `npm create tauri-app@latest` to set up Tauri in your project
4. Once initialization is complete, the development server will continue to start

## Example Flow

```bash
$ npm run dev

> vite

No Tauri configuration found. Would you like to initialize Tauri? (y/N) y

√ App name · my-tauri-app
√ Window title · My Tauri App
√ Package manager · npm
√ UI template · vanilla
...

Tauri has been successfully initialized!
```

## Customizing Initialization

The auto-initialization uses the interactive CLI provided by Tauri, allowing you to customize various aspects of your Tauri application during setup, including:

- App name and window title
- Package manager preference (npm, pnpm, yarn, etc.)
- UI framework/template
- Other Tauri-specific configurations

## Disabling Auto Initialization

If you prefer to initialize Tauri manually, you can decline the prompt by responding with "N" when asked. The Vite server will still start, but without Tauri integration.

## Manual Initialization

If you choose to set up Tauri manually instead of using the auto-initialization feature, you can run:

```bash
npm create tauri-app@latest
```

After manually initializing Tauri, the plugin will detect your configuration the next time you run the development server.
