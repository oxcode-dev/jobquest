// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: process.env.NODE_ENV === "development",
  },
  runtimeConfig: {
    // firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY,
    // firebaseAuthdomain: process.env.NUXT_FIREBASE_AUTHDOMAIN,
    // firebaseProjectId: process.env.NUXT_FIREBASE_PROJECT_ID,
    // firebaseStorageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
    // firebaseMessagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
    // firebaseAppId: process.env.NUXT_FIREBASE_APP_ID,
    // firebaseMeasurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
    public: {
      firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY || '',
      firebaseAuthdomain: process.env.NUXT_FIREBASE_AUTHDOMAIN || '',
      firebaseProjectId: process.env.NUXT_FIREBASE_PROJECT_ID || '',
      firebaseStorageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.NUXT_FIREBASE_APP_ID || '',
      firebaseMeasurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID || '',
    },
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [
          'storeToRefs',
          "defineStore",
          "acceptHMRUpdate",
        ]
      }
    ],
    '@nuxtjs/tailwindcss',
    "@nuxt/image",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  piniaPersistedstate: { storage: 'localStorage' },
  css: ["@/index.css"],
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "JobQuest",
        },
      ],
      title: "JobQuest",
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' },
        { rel: 'preconnect', href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: 'anonymous'},
        { href:"https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap", rel:"stylesheet"},
        // { href: "https://unpkg.com/aos@next/dist/aos.css", rel: 'stylesheet'},
      ],
      script: [
        // { src: 'https://cdn.tailwindcss.com' },
        // { src: 'https://unpkg.com/aos@next/dist/aos.js'},
        // { innerHTML: 'AOS.init()'},
      ]
    }
  },
  plugins: [
    { src: '~/plugins/firebase', mode: 'client' }
  ]
})