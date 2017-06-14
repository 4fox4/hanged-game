module.exports = {
  context: __dirname + "/src",

  entry: {
    javascript: "./index.js",
    html: __dirname + "/index.html"
  },

  output: {
    filename: "app.js",
    path: __dirname + "/app/js",
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  }

};
