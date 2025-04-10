# Troubleshooting

This guide helps you resolve common issues with AAX Audio Converter.

## Common Issues

### Activation Code Issues

**Problem**: "Unable to detect activation code" or "Invalid activation code"

**Solutions**:

1. Run the setup command:

   ```bash
   aax setup-audible
   ```

2. Verify the Audible CLI is installed and configured
3. Check if you're logged in to your Audible account
4. Try manually specifying the activation code:

   ```bash
   aax convert audiobook.aax -c YOUR_ACTIVATION_CODE
   ```

### FFmpeg Issues

**Problem**: "FFmpeg not found" or "FFmpeg error"

**Solutions**:

1. Verify FFmpeg is installed:

   ```bash
   ffmpeg -version
   ```

2. Check if FFmpeg is in your PATH
3. Specify a custom FFmpeg path in your config:

   ```typescript
   // aax.config.ts
   export default {
     ffmpegPath: '/path/to/your/ffmpeg',
   }
   ```

### Chapter Issues

**Problem**: "Chapters not preserved" or "Chapter markers missing"

**Solutions**:

1. Ensure chapter support is enabled:

   ```bash
   aax convert audiobook.aax --chapters=true
   ```

2. Check if your output format supports chapters (M4B is best)
3. Verify your media player supports chapter navigation

### File Permission Issues

**Problem**: "Permission denied" or "Cannot write to output directory"

**Solutions**:

1. Check file permissions:

   ```bash
   ls -l audiobook.aax
   ```

2. Ensure write permissions for the output directory:

   ```bash
   chmod +w output-directory
   ```

3. Try running with sudo (not recommended):

   ```bash
   sudo aax convert audiobook.aax
   ```

### Custom Folder Structure Issues

- **Problem**: Incorrect folder structure.
  - **Solution**: Verify the configuration settings for `flatFolderStructure` and `seriesTitleInFolderStructure`.

### Advanced Conversion Settings

- **Problem**: Conversion fails with variable bit rate.
  - **Solution**: Ensure FFmpeg supports variable bit rate encoding.

### Chapter Handling Problems

- **Problem**: Chapters not preserved.
  - **Solution**: Check if `useNamedChapters` is enabled and verify chapter marks.

### Auto Detection Failures

- **Problem**: Activation code not detected.
  - **Solution**: Ensure the Audible CLI is set up correctly and the account is logged in.

## Verbose Logging

Enable verbose logging to get more detailed error information:

```bash
aax convert audiobook.aax -v
```

## Common Error Messages

| Error Message | Possible Cause | Solution |
|--------------|----------------|----------|
| "FFmpeg not found" | FFmpeg not installed or not in PATH | Install FFmpeg or specify custom path |
| "Invalid activation code" | Wrong or expired activation code | Run setup-audible or use correct code |
| "Cannot read input file" | File doesn't exist or no read permissions | Check file path and permissions |
| "Output directory not writable" | No write permissions | Check directory permissions |
| "Chapter extraction failed" | FFmpeg missing required features | Update FFmpeg or disable chapters |

## Getting Help

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/stacksjs/aax/issues)
2. Join the [Discord Community](https://discord.gg/stacksjs)
3. Create a new issue with:
   - Error message
   - Verbose output
   - Steps to reproduce
   - Your system information

::: tip
When reporting issues, always include the verbose output (`-v` flag) as it provides crucial debugging information.
:::

::: warning
Avoid running the converter with sudo unless absolutely necessary, as it can pose security risks.
:::

When using vite-plugin-tauri, you might encounter some common issues. This guide will help you diagnose and resolve them.

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

1. Check the [Tauri documentation](https://tauri.app/v1/guides/) for platform-specific guidance
2. Visit the [GitHub Issues](https://github.com/stacksjs/vite-plugin-tauri/issues) to see if others have encountered similar problems
3. Join the [Discord community](https://discord.gg/stacksjs) for real-time support
4. Open a new issue with detailed information about your problem, including:
   - Your operating system and version
   - Your Vite and Tauri versions
   - Complete error output
   - Steps to reproduce the issue
