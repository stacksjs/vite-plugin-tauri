# Debugging

The `vite-plugin-tauri` plugin provides tools and methods to effectively debug your Tauri applications during development.

## Frontend Debugging

Frontend debugging works similarly to standard Vite applications:

1. **Browser DevTools**: When your Tauri application is running in development mode, you can access the standard web development tools by right-clicking in your application window and selecting "Inspect Element" or using the keyboard shortcut:
   - macOS: `Cmd + Option + I`
   - Windows/Linux: `Ctrl + Shift + I`

2. **Vite Error Overlay**: Frontend errors are displayed in a user-friendly error overlay within your application window, showing exact file locations and error details.

3. **Console Logging**: `console.log()` and other console methods work as expected, with output visible in the DevTools console.

## Rust Backend Debugging

Debugging the Rust backend of your Tauri application:

1. **Console Output**: Rust `println!()` and similar macros will output to the terminal where you started the dev server.

2. **Logging**: Use the Tauri logging macros (`info!`, `warn!`, `error!`, etc.) for structured logging that integrates with the Tauri framework.

3. **VSCode Debugging**: For more advanced debugging with breakpoints:

   a. Install the [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) and [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb) extensions.

   b. Add a launch configuration to your `.vscode/launch.json`:

   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "lldb",
         "request": "launch",
         "name": "Debug Tauri Application",
         "cargo": {
           "args": ["build", "--manifest-path=src-tauri/Cargo.toml", "--no-default-features"]
         },
         "args": [],
         "cwd": "${workspaceFolder}"
       }
     ]
   }
   ```

## IPC Communication Debugging

To debug communication between your frontend and Rust backend:

1. **Command Invocation**: Add logging on both sides of your commands:

   ```typescript
   // Frontend
   await invoke('my_command', { param: 'value' })
     .then(response => console.log('Command response:', response))
     .catch(error => console.error('Command error:', error))
   ```

   ```rust
   // Backend
   #[tauri::command]
   fn my_command(param: String) -> Result<String, String> {
       println!("Command called with param: {}", param);
       // Command logic
       Ok("Success".into())
   }
   ```

2. **Event Monitoring**: For event-based communication:

   ```typescript
   // Frontend listener
   const unlisten = await listen('my-event', (event) => {
     console.log('Event received:', event)
   })
   ```

## Troubleshooting Common Issues

1. **Build Errors**: If your application fails to build, check the terminal output for Rust compilation errors.

2. **White Screen**: Often caused by frontend errors. Check the dev server output and browser console.

3. **IPC Communication Failures**: Verify command names and parameter types match exactly between frontend and backend.

4. **Hot Reload Issues**: If hot reload isn't working, try restarting the dev server or check for structural changes that require a full restart.
