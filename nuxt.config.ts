// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-ignore
  nitro: {
    compressPublicAssets: true,
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.svg'
        }
      ],
      htmlAttrs: {
        lang: "en"
      }
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase'
  ],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  googleFonts: {
    families: {
      Karla: {
        wght: [400, 700],
      },
    }
  },
  // @ts-ignore
  components: [
    { path: '~/components/UI', prefix: 'UI' },
    '~/components'
  ],
  ssr: true
})
