import type { HeadConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { withPwa } from '@vite-pwa/vitepress'
import { defineConfig } from 'vitepress'
import vite from './vite.config'

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
  { text: 'Changelog', link: 'https://github.com/stacksjs/vite-plugin-dotenvx/releases' },
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
          { text: 'Contributing', link: 'https://github.com/stacksjs/vite-plugin-dotenvx/blob/main/.github/CONTRIBUTING.md' },
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
    text: 'Examples',
    items: [
      { text: 'Basic Usage', link: '/examples/basic' },
      { text: 'Multiple Environments', link: '/examples/multiple-environments' },
      { text: 'Client-Side Variables', link: '/examples/client-side' },
      { text: 'Next.js Convention', link: '/examples/nextjs-convention' },
      { text: 'Auto-Generation', link: '/examples/auto-generation' },
    ],
  },
  { text: 'Showcase', link: '/Showcase' },
]

export default withPwa(
  defineConfig({
    lang: 'en-US',
    title: 'vite-plugin-dotenvx',
    description: 'A Vite plugin to seamlessly integrate with dotenvx.',
    cleanUrls: true,
    lastUpdated: true,
    metaChunk: true,

    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: './images/logo-mini.svg' }],
      ['link', { rel: 'icon', type: 'image/png', href: './images/logo.png' }],
      // meta info
      ['meta', { name: 'theme-color', content: '#0A0ABC' }],
      ['meta', { name: 'title', content: 'vite-plugin-dotenvx | A Vite plugin to seamlessly integrate with dotenvx.' }],
      ['meta', { name: 'description', content: 'A Vite plugin to seamlessly integrate with dotenvx.' }],
      ['meta', { name: 'author', content: 'Stacks.js, Inc.' }],
      ['meta', { name: 'tags', content: 'vite, vite-plugin, dotenvx, dotenv, environment, variables, development, lightweight' }],
      // open graph
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:locale', content: 'en' }],
      ['meta', { property: 'og:title', content: 'vite-plugin-dotenvx | A Vite plugin to seamlessly integrate with dotenvx.' }],
      ['meta', { property: 'og:site_name', content: 'vite-plugin-dotenvx' }],
      ['meta', { property: 'og:image', content: '/images/og-image.png' }],
      ['meta', {
        property: 'og:description',
        content: 'A Vite plugin to seamlessly integrate with dotenvx.',
      }],
      ['meta', { property: 'og:url', content: 'https://vite-plugin-dotenvx.netlify.app/' }],
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
        { icon: 'github', link: 'https://github.com/stacksjs/vite-plugin-dotenvx' },
        { icon: 'discord', link: 'https://discord.gg/stacksjs' },
      ],

      // algolia: services.algolia,

      // carbonAds: {
      //   code: '',
      //   placement: '',
      // },
    },

    pwa: {
      manifest: {
        theme_color: '#0A0ABC',
      },
    },

    markdown: {
      theme: {
        light: 'github-light',
        dark: 'github-dark',
      },

      codeTransformers: [
        transformerTwoslash(),
      ],
    },

    vite,
  }),
)
