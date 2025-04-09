# Environment Variables

The `vite-plugin-tauri` plugin uses environment variables to customize its behavior. This page documents the available environment variables and how they can be used.

## Available Environment Variables

### `TAURI_PATH_DEPTH`

**Default**: `3`

Controls how deep the plugin searches for Tauri configuration files in your project directory.

**Example**:

```bash
# Search up to 5 levels deep
TAURI_PATH_DEPTH=5 npm run dev
```

This is useful if you have a complex project structure where the Tauri configuration file might be located in a deeply nested directory.

## Setting Environment Variables

You can set these environment variables in several ways:

### Command Line

```bash
TAURI_PATH_DEPTH=5 npm run dev
```

### `.env` File

```
# .env
TAURI_PATH_DEPTH=5
```

### In Your `package.json` Scripts

```json
{
  "scripts": {
    "dev": "cross-env TAURI_PATH_DEPTH=5 vite"
  }
}
```

### In Your CI/CD Pipeline

Most CI/CD platforms allow you to set environment variables for your builds:

#### GitHub Actions Example

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      TAURI_PATH_DEPTH: 5
    steps:
    # ...build steps
```

## Tauri-Specific Environment Variables

Tauri itself also uses various environment variables that can affect how your application is built and run. For information on these variables, please refer to the [Tauri documentation](https://tauri.app/v1/api/config/).
