'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _storyboard = require('storyboard');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _all = require('../locales/all');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkg = require('../../package.json');

var fProduction = process.env.NODE_ENV === 'production';
var fSsr = !!process.env.SERVER_SIDE_RENDERING;

_storyboard.mainStory.info('webpack', 'Webpack configuration:', {
  attach: {
    environment: fProduction ? 'PRODUCTION' : 'DEVELOPMENT',
    fSsr: fSsr,
    version: pkg.version
  }
});

var _entry = function _entry(file) {
  return fProduction || fSsr ? [file] : ['webpack-hot-middleware/client?reload=true', file];
};

var _styleLoader = function _styleLoader(loaderDesc) {
  return fSsr ? _extractTextWebpackPlugin2.default.extract('style-loader', loaderDesc) : 'style!' + loaderDesc;
};

exports.default = {

  // -------------------------------------------------
  // Input (entry point)
  // -------------------------------------------------
  entry: fSsr ? { ssr: _entry('./src/server/ssr.js') } : { app: _entry('./src/client/startup.js') },

  // -------------------------------------------------
  // Output
  // -------------------------------------------------
  output: {
    filename: '[name].bundle.js',

    // Where PRODUCTION bundles will be stored
    path: fSsr ? _path2.default.resolve(process.cwd(), 'public/ssr') : _path2.default.resolve(process.cwd(), 'public/assets'),

    publicPath: '/assets/',

    libraryTarget: fSsr ? 'commonjs2' : undefined
  },

  // -------------------------------------------------
  // Configuration
  // -------------------------------------------------
  devtool: fProduction || fSsr ? undefined : 'eval',
  target: fSsr ? 'node' : undefined,

  // Don't redefine `__dirname` when compiling for Node (SSR)
  // https://github.com/webpack/webpack/issues/1599#issuecomment-186841345
  node: fSsr ? { __dirname: false, __filename: false } : undefined,

  resolve: {
    // Add automatically the following extensions to required modules
    extensions: ['', '.jsx', '.js']
  },

  plugins: function () {
    // const momentLocaleFiles = SUPPORTED_LOCALES.map(o => `${o.toLowerCase()}.js`);
    var ourOwnLocaleFiles = _all.SUPPORTED_LOCALES.map(function (o) {
      return o + '.js';
    });
    var ret = [function pluginCompile() {
      this.plugin('compile', function () {
        return _storyboard.mainStory.debug('webpack', 'Bundling...');
      });
    }, function pluginDone() {
      this.plugin('done', function () {
        return _storyboard.mainStory.debug('webpack', 'Finished bundling!');
      });
    }, new _webpack2.default.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(fProduction ? 'production' : 'development'),
      'process.env.SERVER_SIDE_RENDERING': JSON.stringify(fSsr)
    }),
    // Replace moment's dynamic require regex: ^\.\/.*$    by...
    // new webpack.ContextReplacementPlugin(
    //   /moment[\\\/]locale$/,
    //   new RegExp(`.[\\\/](${momentLocaleFiles.join('|')})$`)
    // ),
    // Replace mady's dynamic require regex: ./~/bundle-loader!^\.\/.*\.js$    by...
    new _webpack2.default.ContextReplacementPlugin(/src[\\\/]locales$/, new RegExp('.[\\/](' + ourOwnLocaleFiles.join('|') + ')$'))];
    if (fSsr) {
      ret.push(new _extractTextWebpackPlugin2.default('[name].bundle.css'));
    }
    var langsDesc = _all.SUPPORTED_LOCALES.join(', ');
    _storyboard.mainStory.warn('webpack', 'Please check that the supported langs for moment.js are correct: ' + langsDesc);
    if (fProduction) {
      ret.push(new _webpack2.default.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        sourceMap: false
      }));
    } else if (!fSsr) {
      ret.push(new _webpack2.default.HotModuleReplacementPlugin());
      ret.push(new _webpack2.default.NoErrorsPlugin());
    }
    return ret;
  }(),

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      exclude: _path2.default.resolve(process.cwd(), 'node_modules')
    }, {
      test: /\.(otf|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file'
    }, {
      test: /\.css$/,
      loader: _styleLoader('css')
    }, {
      test: /\.sass$/,
      loader: _styleLoader('css!sass?indentedSyntax')
    }, {
      test: /\.png$/,
      loader: 'file'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  }
};