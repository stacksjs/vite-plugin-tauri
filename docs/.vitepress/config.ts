import type { HeadConfig } from 'vitepress'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
const analyticsHead: HeadConfig[] = [
  [
    'script',
    {
      'src': 'https://cdn.usefathom.com/script.js',
      'data-site': 'EVVUGSUE',
      'defer': '',
    },
  ],
]

const nav = [
  { text: 'News', link: 'https://stacksjs.org/news' },
  { text: 'Changelog', link: 'https://github.com/stacksjs/vite-plugin-tauri/releases' },
  {
    text: 'Resources',
    items: [
      { text: 'Team', link: '/team' },
      { text: 'Sponsors', link: '/sponsors' },
      { text: 'Partners', link: '/partners' },
      { text: 'Postcardware', link: '/postcardware' },
      { text: 'License', link: '/license' },
      {
        items: [
          { text: 'Awesome Stacks', link: 'https://github.com/stacksjs/awesome-stacks' },
          { text: 'Contributing', link: 'https://github.com/stacksjs/vite-plugin-tauri/blob/main/.github/CONTRIBUTING.md' },
        ],
      },
    ],
  },
]

const sidebar = [
  {
    text: 'Get Started',
    items: [
      { text: 'Intro', link: '/intro' },
      { text: 'Install', link: '/install' },
      { text: 'Usage', link: '/usage' },
    ],
  },
  {
    text: 'Features',
    items: [
      { text: 'Auto Initialization', link: '/features/auto-initialization' },
      { text: 'Development Mode', link: '/features/development-mode' },
      { text: 'Build Integration', link: '/features/build-integration' },
      { text: 'CLI Passthrough', link: '/features/cli-passthrough' },
    ],
  },
  {
    text: 'API Reference',
    items: [
      { text: 'Plugin API', link: '/api/plugin' },
      { text: 'CLI Arguments', link: '/api/cli-arguments' },
      { text: 'Environment Variables', link: '/api/environment-variables' },
    ],
  },
  { text: 'Showcase', link: '/Showcase' },
]

export default defineConfig({
  lang: 'en-US',
  title: 'vite-plugin-tauri',
  description: 'A Vite plugin to seamlessly integrate with Tauri.',
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: './images/logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: './images/logo.png' }],
    // meta info
    ['meta', { name: 'theme-color', content: '#0A0ABC' }],
    ['meta', { name: 'title', content: 'vite-plugin-tauri | A Vite plugin to seamlessly integrate with Tauri.' }],
    ['meta', { name: 'description', content: 'A Vite plugin to seamlessly integrate with Tauri.' }],
    ['meta', { name: 'author', content: 'Stacks.js, Inc.' }],
    ['meta', { name: 'tags', content: 'vite, vite-plugin, tauri, desktop, app, electron-alternative, development, lightweight' }],
    // open graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'vite-plugin-tauri | A Vite plugin to seamlessly integrate with Tauri.' }],
    ['meta', { property: 'og:site_name', content: 'vite-plugin-tauri' }],
    ['meta', { property: 'og:image', content: '/images/og-image.png' }],
    ['meta', {
      property: 'og:description',
      content: 'A Vite plugin to seamlessly integrate with Tauri.',
    }],
    ['meta', { property: 'og:url', content: 'https://vite-plugin-tauri.netlify.app/' }],
    ...analyticsHead,
  ],

  themeConfig: {
    search: {
      provider: 'local',
    },
    logo: {
      light: './images/logo-transparent.svg',
      dark: './images/logo-white-transparent.svg',
    },

    nav,
    sidebar,

    editLink: {
      pattern: 'https://github.com/stacksjs/stacks/edit/main/docs/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Stacks.js, Inc.',
    },

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/stacksjs' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/chrisbreuer.dev' },
      { icon: 'github', link: 'https://github.com/stacksjs/vite-plugin-tauri' },
      { icon: 'discord', link: 'https://discord.gg/stacksjs' },
    ],
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
})
