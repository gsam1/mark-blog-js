module.exports = {
  entry: './blog.js',
  output: {
    filename: './bundle.js'
  },

  watch:true,

  module: {
    loaders: [
      {
        test:/\.md$/,
        loader: 'html-loader!markdown-loader'
      }
    ]
  }
};
