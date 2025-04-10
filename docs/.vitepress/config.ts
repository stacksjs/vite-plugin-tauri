import type { HeadConfig } from 'vitepress'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config

const analyticsHead: HeadConfig[] = [
  [
    'script',
    {
      'src': 'https://cdn.usefathom.com/script.js',
      'data-site': 'ACPOFWJF',
      'defer': '',
    },
  ],
]

const nav = [
  { text: 'News', link: 'https://stacksjs.org/news' },
  {
    text: 'Changelog',
    link: 'https://github.com/stacksjs/vite-plugin-tauri/blob/main/CHANGELOG.md',
  },
  {
    text: 'Resources',
    items: [
      { text: 'Team', link: '/team' },
      { text: 'Sponsors', link: '/sponsors' },
      { text: 'Partners', link: '/partners' },
      { text: 'Postcardware', link: '/postcardware' },
      { text: 'Stargazers', link: '/stargazers' },
      { text: 'License', link: '/license' },
      {
        items: [
          {
            text: 'Awesome Stacks',
            link: 'https://github.com/stacksjs/awesome-stacks',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/stacksjs/vite-plugin-tauri/blob/main/.github/CONTRIBUTING.md',
          },
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
      { text: 'Config', link: '/config' },
    ],
  },
  {
    text: 'Features',
    items: [
      { text: 'Auto Integration', link: '/features/auto-integration' },
      { text: 'Development Mode', link: '/features/dev-mode' },
      { text: 'Build Integration', link: '/features/build-integration' },
      { text: 'CLI Passthrough', link: '/features/cli-passthrough' },
      { text: 'System Tray', link: '/features/system-tray' },
    ],
  },
  {
    text: 'Advanced',
    items: [
      { text: 'Troubleshooting', link: '/advanced/troubleshooting' },
    ],
  },
  { text: 'API Reference', link: '/api-reference' },
]

const description = 'A Vite plugin to seamlessly integrate with Tauri for desktop and mobile app development.'
const title = 'vite-plugin-tauri | Seamless Tauri integration for Vite projects'

export default defineConfig({
  lang: 'en-US',
  title: 'vite-plugin-tauri',
  description,
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: './images/logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: './images/logo.png' }],
    ['meta', { name: 'theme-color', content: '#0A0ABC' }],
    ['meta', { name: 'title', content: title }],
    ['meta', { name: 'description', content: description }],
    ['meta', { name: 'author', content: 'Stacks.js, Inc.' }],
    ['meta', {
      name: 'tags',
      content: 'tauri, vite, plugin, desktop, mobile, app, typescript, framework',
    }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],

    ['meta', { property: 'og:site_name', content: 'Vite Plugin Tauri' }],
    ['meta', { property: 'og:image', content: './images/og-image.jpg' }],
    ['meta', { property: 'og:url', content: 'https://vite-plugin-tauri.stacksjs.org/' }],
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
      pattern: 'https://github.com/stacksjs/vite-plugin-tauri/edit/main/docs/docs/:path',
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
