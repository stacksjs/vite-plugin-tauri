import { resolve } from 'node:path'
// import Inspect from 'vite-plugin-inspect'
import UnoCSS from 'unocss/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Dotenvx from '../../src'

export default defineConfig({
  envPrefix: 'FRONTEND_',

  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },

  resolve: {
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },

  plugins: [
    // custom
    // MarkdownTransform(),
    // Contributors(contributions),

    // plugins
    Components({
      dirs: resolve(__dirname, 'theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
      dts: resolve(__dirname, 'components.d.ts'),
      transformer: 'vue3',
    }),

    Icons({
      compiler: 'vue3',
      defaultStyle: 'display: inline-block',
    }),

    UnoCSS(resolve(__dirname, 'unocss.config.ts')),

    Dotenvx({
      verbose: true,
      path: ['.env'],
      envKeysFile: '.env.keys',
      overload: false,
    }),

    VueDevTools(),
    // Inspect(),
  ],

  optimizeDeps: {
    exclude: [
      // 'vue',
      'body-scroll-lock',
    ],
  },
})
