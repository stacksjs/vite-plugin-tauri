# Development Mode

vite-plugin-tauri provides a seamless development mode that automatically launches and connects your Tauri application with your Vite development server.

## How Dev Mode Works

When you run your Vite development server with `npm run dev` (or equivalent), the plugin automatically:

1. Detects your Vite server's address and port
2. Configures Tauri to connect to your Vite development server
3. Launches the Tauri development environment with your application loaded
4. Enables hot module replacement (HMR) to instantly reflect your code changes

## Behind the Scenes

The plugin hooks into Vite's server startup process and, once the server is listening, it configures and launches Tauri:

```typescript
server.httpServer?.once('listening', () => {
  const localhosts = [
    'localhost',
    '127.0.0.1',
    '::1',
    '0000:0000:0000:0000:0000:0000:0000:0001',
  ]

  const address = server.httpServer?.address()
  if (!address) {
    console.error('Dev server is not running')
    return
  }

  const protocol = server.config.server.https ? 'https' : 'http'
  const host = localhosts.includes(address.address)
    ? 'localhost'
    : address.address
  const port = address.port

  // Configure and launch Tauri with this development URL
  TauriCli.run(['dev',], 'vite-plugin-tauri')
})
```

## Live Reloading

When using development mode:

- Frontend changes trigger Vite's Hot Module Replacement, instantly updating your UI
- Backend changes (Rust code) require a restart of the Tauri application

## Debugging

You can enable Tauri's debugging mode by passing the `--debug` flag:

```bash
npm run dev -- -t --debug
```

This will:

- Enable more verbose logging
- Show development tools in the Tauri window
- Provide more detailed error information

## Using Custom Development URLs

By default, the plugin will use the Vite development server URL (usually something like `http://localhost:5173`). If you need to use a custom development URL, you can do so by configuring your Tauri application after initialization.

## Development Environment Variables

You can customize the development environment by setting environment variables before running the dev command:

```bash
TAURI_PLATFORM=macos npm run dev
```

## Benefits of Dev Mode

The development mode provides several advantages:

- **Instant Feedback**: See changes immediately without manual rebuilds
- **Native Integration**: Test native features while developing
- **Streamlined Workflow**: No need to run separate development commands
- **Unified Environment**: Frontend and backend development in sync
- **Simplified Debugging**: Easily inspect and debug both frontend and backend

## Best Practices

- Keep your application's bundle size in mind during development
- Use conditional imports for Tauri-specific features to allow web fallbacks
- Separate platform-specific code into dedicated modules
- Use Tauri's event system for communication between frontend and backend

Development mode makes building Tauri applications with Vite as smooth and efficient as possible, allowing you to focus on creating your application rather than managing build processes.
