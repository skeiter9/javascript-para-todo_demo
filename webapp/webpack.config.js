var path = require('path');
var Webpack = require('webpack');

var dirBower = path.join(__dirname + '/bower_components');

var webpackConfig = {
  addVendor: function(name, path_) {
    this.resolve.alias[name] = path_;
  },
  entry: {
    app: [
      'webpack/hot/dev-server',
      './src/app'
    ],
    vendor: [
      'angular',
      'angular-animate',
      'angular-resource',
      'angular-messages',
      'angular-material',
      'angular-material-css',
      'angular-aria',
      'angular-touch',
      'angular-translate',
      'mdi',
      'tweenMax',
      'ngFx',
      'ui.router',
      'angular-dynamic-locale',
      'apiLb'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: '/dist'
  },
  module: {
    loaders: [
      {test: /\.jade$/, loader: 'jade'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.styl$/, loader: 'style!css!stylus'},
      {test: /\.(png|jpg|jpeg|woff|woff2)$/, loader: 'url', query: {limit: 100000, name: '[name].[ext]'}}
    ]
  },
  plugins: [
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    })
  ],
  resolve: {
    alias: [],
    extensions: [
      '',
      '.js',
      '.jade',
      '.scss',
      '.styl'
    ],
    modulesDirectories: [
      'node_modules',
      'lib_components'
    ]
  },
  devServer: {
    contentBase: './dist',
    host: 'injusticeapp.io',
    publicPath: '/public',
    port: 8091
  }
}

webpackConfig.addVendor('apiLb', path.join(__dirname + '/src/api/api-lb'));
webpackConfig.addVendor('nib', dirBower + '/nib/lib/nib/index');
webpackConfig.addVendor('verge', dirBower + '/verge/verge');
webpackConfig.addVendor('mdi', dirBower + '/mdi/scss/materialdesignicons');
webpackConfig.addVendor('ngFx', dirBower + '/ngFx/dist/ngFx');
webpackConfig.addVendor('tweenMax', dirBower + '/gsap/src/uncompressed/TweenMax');
webpackConfig.addVendor('ui.router', dirBower + '/angular-ui-router/release/angular-ui-router');
webpackConfig.addVendor('angular-dynamic-locale', dirBower + '/angular-dynamic-locale/dist/tmhDynamicLocale');
webpackConfig.addVendor('angular-material', dirBower + '/material/dist/angular-material');
webpackConfig.addVendor('angular-material-css', dirBower + '/material/dist/angular-material.css');
webpackConfig.addVendor('angular-translate', dirBower + '/angular-translate/angular-translate');
webpackConfig.addVendor('angular-file-upload', dirBower + '/angular-file-upload/angular-file-upload.js');
webpackConfig.addVendor('angular-translate-loader-static-files', dirBower + '/angular-translate-loader-static-files/angular-translate-loader-static-files');

module.exports = webpackConfig;
//var compiler = Webpack(webpackConfig);
