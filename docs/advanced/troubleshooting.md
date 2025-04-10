# Troubleshooting

This guide helps you resolve common issues with `vite-plugin-tauri`.

## Common Issues

### Tauri Prerequisites Not Installed

**Symptoms:**

- Error messages about missing Rust, missing system dependencies, or compiler errors
- The Tauri initialization fails with dependency-related errors

**Solution:**
Make sure you have installed all the [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites/) for your platform:

```bash
# macOS
xcode-select --install
rustup update

# Windows
# Install Rust from https://rustup.rs/
# Install Visual Studio C++ Build Tools

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install -y libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

### Plugin Not Finding Tauri Configuration

**Symptoms:**

- The plugin keeps asking to initialize a Tauri project even when one exists
- The Tauri application isn't loading correctly

**Solution:**
Check the location of your Tauri configuration file. The plugin searches for `tauri.conf.json`, `tauri.conf.json5`, or `Tauri.toml` within a configurable depth (default: 3 levels) of your project root.

You can increase the search depth:

```bash
TAURI_PATH_DEPTH=5 npm run dev
```

### Vite Development Server Not Connecting to Tauri

**Symptoms:**

- Tauri window shows a connection error or blank screen
- Tauri is running but can't connect to your Vite application

**Solution:**
Ensure that your Vite server is accessible and check that there are no network restrictions or firewall issues. You can also try specifying the host explicitly in your Vite configuration:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    host: 'localhost',
    port: 5173
  },
  plugins: [
    Tauri()
  ]
})
```

### Build Errors

**Symptoms:**

- Errors during the build process
- Missing files or incorrect paths in the Tauri build

**Solution:**

1. Make sure your Vite build completes successfully before the Tauri build starts
2. Check that your Vite output directory is correctly configured
3. Verify that your Tauri configuration points to the right locations

For build-specific issues, you can get more detailed output:

```bash
npm run build -- -t --verbose
```

### Version Mismatches

**Symptoms:**

- Incompatibility errors between different Tauri components
- Unexpected behavior in the built application

**Solution:**
Ensure that your Tauri CLI version matches the Tauri core version in your project:

```bash
# Check Tauri CLI version
cargo tauri --version

# Check the version in your Cargo.toml
# Look for the line with `tauri = "x.y.z"`
```

For Tauri v1 vs. v2 issues, the plugin has compatibility code but may need manual adjustment in some cases.

### Permission Issues

**Symptoms:**

- Your application fails when trying to access system resources
- Operations like file access, network requests, or system dialogs fail

**Solution:**
Tauri uses a security-focused approach that requires explicit permission configuration. Update your `tauri.conf.json` to enable the necessary permissions:

```json
{
  "tauri": {
    "allowlist": {
      "fs": {
        "all": true,
        "readFile": true,
        "writeFile": true,
        "readDir": true,
        "scope": ["$APPDATA/*"]
      },
      "dialog": {
        "all": true
      }
    }
  }
}
```

### Custom Configurations Not Applied

**Symptoms:**

- Your custom Tauri configuration settings are ignored
- The application behaves with default settings despite configuration changes

**Solution:**
Make sure your configuration changes are in the correct format and location. If you're passing configuration via CLI, verify the syntax:

```bash
npm run build -- -t --config '{"tauri":{"bundle":{"identifier":"com.example.custom"}}}'
```

## Debugging Techniques

### Enable Verbose Logging

```bash
npm run dev -- -t --debug --verbose
```

### Inspect the Tauri Process

You can enable the developer tools in your Tauri window by adding this to your configuration:

```json
{
  "tauri": {
    "windows": [
      {
        "width": 800,
        "height": 600,
        "devTools": true
      }
    ]
  }
}
```

Then press `F12` or `Ctrl+Shift+I` to open developer tools in the Tauri window.

### Check Temporary Files

The plugin generates temporary configuration during the build and development process. You can inspect these files in your project's temporary directory.

### Manually Run Tauri Commands

If the plugin is not working as expected, you can try running Tauri commands directly to isolate the issue:

```bash
# Development mode
cargo tauri dev

# Build mode
cargo tauri build
```

## Getting Help

If you're still experiencing issues:

1. Check the [Tauri documentation](https://v2.tauri.app/start/) for platform-specific guidance
2. Visit the [GitHub Issues](https://github.com/stacksjs/vite-plugin-tauri/issues) to see if others have encountered similar problems
3. Join the [Discord community](https://discord.gg/stacksjs) for real-time support
4. Open a new issue with detailed information about your problem, including:
    - Your operating system and version
    - Your Vite and Tauri versions
    - Complete error output
    - Steps to reproduce the issue
