---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "vite-plugin-tauri"
  text: "Seamless Tauri integration for Vite"
  tagline: "Automatically integrate Tauri with your project for building desktop & mobile apps"
  image: /images/logo-white.png
  actions:
    - theme: brand
      text: Get Started
      link: /intro
    - theme: alt
      text: View on GitHub
      link: https://github.com/stacksjs/vite-plugin-tauri

features:
  - title: Auto Integration & Initialization
    icon: 🔄
    details: "Automatically detects and initializes Tauri in your Vite project with zero config."
  - title: Development Mode
    icon: 🛠️
    details: "Launches Tauri alongside your Vite dev server with proper URL configuration."
  - title: Build Integration
    icon: 📦
    details: "Seamlessly configures Tauri build with your Vite output directory for production builds."
  - title: CLI Passthrough
    icon: 🧰
    details: "Pass arguments to Tauri CLI for advanced configurations and debugging."
  - title: System Tray Apps
    icon: 🔔
    details: "Supports creating system tray applications that run in the notification area of your OS."
  - title: Mobile Support
    icon: 📱
    details: "Build applications for iOS and Android using the same codebase as your desktop app."
  - title: API Reference
    icon: 📘
    details: "Comprehensive API documentation for the plugin, CLI arguments, and environment variables."
---

<Home />
