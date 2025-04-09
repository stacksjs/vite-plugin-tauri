# Mobile Development

The `vite-plugin-tauri` plugin provides support for developing and building Tauri applications for mobile platforms (iOS and Android).

## Overview

Tauri's mobile support allows you to build your application for iOS and Android using the same codebase as your desktop application. The plugin streamlines this process by integrating mobile development workflows into your Vite development environment.

## Prerequisites

Before getting started with mobile development:

1. **Setup Tauri for Mobile**: Follow the [official Tauri mobile setup guide](https://beta.tauri.app/guides/mobile/development/setup/) to install the necessary dependencies:
   - For iOS: Xcode and iOS SDK
   - For Android: Android Studio, JDK, and Android SDK

2. **Configure Your Project**: Ensure your project is configured for mobile development with the appropriate configuration in `tauri.conf.json`.

## Adding Mobile to Existing Projects

To add mobile capabilities to an existing Tauri project:

```bash
cd your-project
pnpm tauri add mobile
```

This command will add the necessary mobile components to your project.

## Development Workflow

The plugin extends Vite's development server to support mobile development:

### Starting the Development Server

Use your standard development command to start a development session that includes mobile platforms:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The plugin will detect your mobile configuration and provide appropriate commands.

### iOS Development

To develop and test on iOS:

```bash
pnpm tauri ios dev
```

This command launches your application in the iOS simulator or connected device. Hot reload functionality is supported, allowing you to see changes in real-time on your iOS device or simulator.

### Android Development

To develop and test on Android:

```bash
pnpm tauri android dev
```

This command builds and launches your application on an Android emulator or connected device. Similar to iOS, hot reload is supported to accelerate your development workflow.

## Building for Production

When you're ready to build your application for production:

### iOS Build

```bash
pnpm tauri ios build
```

This creates a production-ready iOS package that can be submitted to the App Store.

### Android Build

```bash
pnpm tauri android build
```

This creates a release APK or AAB file that can be distributed through the Google Play Store or other distribution channels.

## Platform-Specific Code

You can use platform detection to execute different code based on the runtime platform:

```typescript
import { getVersion, type } from '@tauri-apps/api/os'

// Check if running on mobile
if (type() === 'Darwin-iOS' || type() === 'Linux-Android') {
  // Mobile-specific code
}
else {
  // Desktop-specific code
}
```

## Mobile-Optimized UI

Consider these best practices for mobile interfaces:

1. **Responsive Design**: Ensure your UI adapts to different screen sizes and orientations
2. **Touch-Friendly Controls**: Use larger touch targets and appropriate spacing
3. **Mobile Navigation Patterns**: Implement swipe gestures and mobile-familiar navigation
4. **Platform Guidelines**: Follow iOS and Android design guidelines for native feel

## Known Limitations

- Some Tauri APIs may have different functionality or limitations on mobile platforms
- File system access follows mobile platform permissions models
- Background processes have limitations based on mobile OS restrictions
