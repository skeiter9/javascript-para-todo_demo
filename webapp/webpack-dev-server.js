var Webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");

var server = new WebpackDevServer(Webpack(require('./webpack.config')), {
  // webpack-dev-server options
  contentBase: "./dist",
  // or: contentBase: "http://localhost/",

  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: false,
  //filename: "bundle.js",
  watchDelay: 300,
  publicPath: "/public",
  //headers: { "X-Custom-Header": "yes" },
  stats: {colors: true},

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: true,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "*" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  //proxy: {
    //"*": "http://localhost:9003"
  //}
});
server.listen(8090, "localhost", function() {});
