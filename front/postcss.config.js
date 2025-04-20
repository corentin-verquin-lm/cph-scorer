module.exports = {
  plugins: [
    // require('@fullhuman/postcss-purgecss')({
    //   content: ['src/**'],
    //   variables: true,
    //   safelist: {
    //     standard: [/^alert/]
    //   }
    // }),
    require('postcss-combine-media-query')
  ]
}