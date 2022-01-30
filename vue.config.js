module.exports = {
   css: {
      loaderOptions: {
         sass: {
            prependData: `@import "@/assets/sass/styles.scss";`
         }
      }
   }
}

module.exports = {    
   publicPath: process.env.NODE_ENV === 'production'    
   ? '/hello-world/'
   : '/'
}