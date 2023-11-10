module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  devServer: {
    watchOptions: {
      poll: true
    },
  },  
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/index.scss";`
      }
    }
  }
}