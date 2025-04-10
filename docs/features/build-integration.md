# Build Integration

vite-plugin-tauri provides seamless build integration between Vite and Tauri, ensuring your application is correctly packaged for distribution.

## How Build Integration Works

When you run your Vite build command (`npm run build` or equivalent), the plugin:

1. First allows Vite to build your web application assets
2. Then automatically configures Tauri to use these built assets
3. Triggers the Tauri build process to create platform-specific binaries
4. Outputs distribution-ready packages for your target platforms

## Behind the Scenes

The plugin hooks into Vite's `closeBundle` hook to start the Tauri build process once the Vite build is complete:

```typescript
async function closeBundle() {
  try {
    let tauriConfPath = getTauriConfPath()
    if (!tauriConfPath) {
      await initTauri()
      tauriConfPath = getTauriConfPath()
    }

    let args = parseTauriArgs(process.argv) ?? []
    if (!args.includes('dev') && !args.includes('build')) {
      args = ['build', ...args]
    }

    args = [
      ...args,
      '--config',
      JSON.stringify({
        build: {
          distDir: path.relative(
            path.dirname(tauriConfPath),
            path.resolve(viteConfig.build.outDir),
          ),
        },
      }),
    ]

    await TauriCli.run(args, 'vite-plugin-tauri')
  }
  catch (error) {
    console.error('Failed to build Tauri application:', error)
    throw error
  }
}
```

## Build Output

By default, the Tauri build process creates platform-specific binaries in:

- `src-tauri/target/release/[app-name]` (executable)
- `src-tauri/target/release/bundle/` (packaged applications)

These outputs include:

- Windows: `.msi`, `.msix`
- macOS: `.app`, `.dmg`
- Linux: `.AppImage`, `.deb`, and other formats

## Customizing the Build

You can customize the build process by:

1. Passing CLI arguments to the Tauri build process:

```bash
npm run build -- -t --target x86_64-pc-windows-msvc
```

2. Modifying your Tauri configuration file (`tauri.conf.json`):

```json
{
  "tauri": {
    "bundle": {
      "active": true,
      "targets": ["msi", "dmg", "appimage"],
      "identifier": "com.company.app",
      "icon": ["icons/32x32.png", "icons/icon.icns"]
    }
  }
}
```

## Target Platforms

Tauri can build applications for:

- Windows (x64, ARM64)
- macOS (x64, ARM64/Apple Silicon)
- Linux (x64, ARM64)

By default, the build will target your current platform, but you can specify other platforms using the `--target` flag.

## Version Management

The version of your application is controlled by the `package.version` field in the Tauri configuration. You can:

1. Manually update it in `tauri.conf.json`
2. Sync it with your `package.json` version during the build process

## Build Hooks

Tauri provides several build hooks that you can leverage:

- `beforeDevCommand`: Executed before starting dev mode
- `beforeBuildCommand`: Executed before building
- `onBundleComplete`: Executed after bundle completion

## Best Practices

- Always test your builds on all target platforms before distribution
- Consider code signing your applications for better user experience
- Keep your Vite build output small for faster app startup times
- Use environment variables to control the build process:

  ```
  TAURI_PRIVATE_KEY=... npm run build
  ```

- Set up CI/CD pipelines for consistent build environments

## Troubleshooting

If you encounter build issues:

1. Ensure all Tauri dependencies are installed for your platform
2. Check that your Vite build successfully completes before the Tauri build starts
3. Verify your Tauri configuration matches your project structure
4. Check the Rust compiler output for errors in native code

The build integration ensures that your application is properly packaged and ready for distribution with minimal configuration required.
