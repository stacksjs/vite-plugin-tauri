# Development Server

The `vite-plugin-tauri` plugin provides an integrated development server that streamlines the development workflow for Tauri applications.

## Features

When you run your Vite dev server with this plugin enabled, it:

1. Automatically starts a Tauri development instance alongside your Vite server
2. Connects your frontend and Tauri backend for seamless development
3. Provides real-time feedback through the console about the state of your Tauri application
4. Enables hot reloading of both frontend and backend code changes

## Getting Started

The dev server is launched automatically when you run your standard Vite development command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Configuration

The dev server behavior can be customized through the plugin options in your `vite.config.js` or `vite.config.ts` file:

```javascript
import { defineConfig } from 'vite'
import { tauri } from 'vite-plugin-tauri'

export default defineConfig({
  plugins: [
    tauri({
      // Dev server configuration options
    })
  ],
})
```

## Console Feedback

During development, the server provides informative console output to help you understand the state of your application, including:

- Tauri application build status
- Compilation errors in your Rust code
- Connection status between frontend and backend
- Hot reload events

## Development Flow

The integrated development server handles the complex orchestration between:

1. Vite's frontend server (HTML, CSS, JS/TS)
2. Tauri's Rust-based backend
3. The native window that displays your application
4. File watching systems for hot reload capabilities

This unified approach eliminates the need for you to manage multiple terminal windows or synchronize different development processes manually.
