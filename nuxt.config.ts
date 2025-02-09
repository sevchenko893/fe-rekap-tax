export default defineNuxtConfig({
  nitro: {
    preset: 'static' // Mode Static (SSG)
  },
  // Nonaktifkan SSR jika menggunakan Vuetify dengan Nuxt 3
  ssr: false,

  // Tambahkan stylesheet Vuetify
  css: ["vuetify/styles",'@mdi/font/css/materialdesignicons.css'],
  

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    ssr: {
      noExternal: ["vuetify"], // Ini penting agar tidak ada error SSR
    },
  },

  compatibilityDate: "2025-02-09",
});