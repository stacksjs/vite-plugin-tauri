# Hot Reload

The `vite-plugin-tauri` plugin offers an enhanced development experience through hot reloading capabilities, which automatically update your Tauri application when you make changes to your code.

## Frontend Hot Reloading

When you modify your frontend code (HTML, CSS, JavaScript, etc.), the changes are automatically reflected in your Tauri application window without requiring a full restart. This functionality is powered by Vite's built-in hot module replacement (HMR) system.

## Tauri Backend Hot Reloading

For Rust code changes in your Tauri backend, the plugin implements a specialized hot reload mechanism:

1. When you modify a Rust file, the plugin detects the change
2. The Tauri application is automatically recompiled in the background
3. Once compilation is complete, the application window refreshes to load the new backend code

## Configuring Hot Reload

By default, hot reload is enabled for both frontend and backend code. The plugin is configured to watch relevant files and directories to trigger reloads when necessary.

## Performance Benefits

Hot reloading significantly improves development speed by:

- Eliminating the need to manually restart the application after code changes
- Preserving application state between reloads where possible
- Reducing the compile-test-debug cycle time

## Limitations

While hot reloading works for most changes, there are some limitations:

- Certain structural changes to Rust code might require a full application restart
- Changes to configuration files like `tauri.conf.json` typically need a full restart
- Hardware access or system-level integrations might not update correctly with hot reload

If you encounter issues with hot reload, you can always restart your development server for a clean state.
