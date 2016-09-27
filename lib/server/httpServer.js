'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _storyboard = require('storyboard');

var _storyboard2 = _interopRequireDefault(_storyboard);

var _wsServer = require('storyboard/lib/listeners/wsServer');

var _wsServer2 = _interopRequireDefault(_wsServer);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _all = require('../locales/all');

var _all2 = _interopRequireDefault(_all);

var _translate = require('../translate');

var _translate2 = _interopRequireDefault(_translate);

var _gqlServer = require('./gqlServer');

var gqlServer = _interopRequireWildcard(_gqlServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainStory = _storyboard2.default.mainStory;
var chalk = _storyboard2.default.chalk;

var webpack = void 0;
var webpackDevMiddleware = void 0;
var webpackHotMiddleware = void 0;
var webpackConfig = void 0;
/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
  webpack = require('webpack');
  webpackDevMiddleware = require('webpack-dev-middleware');
  webpackHotMiddleware = require('webpack-hot-middleware');
  webpackConfig = require('./webpackConfig').default;
}
var ssr = null;
try {
  /* eslint-disable import/no-unresolved */
  ssr = require('../../public/ssr/ssr.bundle');
  /* eslint-disable import/no-unresolved */
  mainStory.info('http', 'Loaded SSR module successfully');
} catch (err) {
  if (err.message.indexOf('Cannot find module') !== 0) {
    mainStory.warn('http', 'SSR module could not be loaded', { attach: err });
  } else {
    mainStory.warn('http', 'No SSR module available');
  }
}
/* eslint-enable global-require */

var ASSET_PATH = '../../public';
var DEFAULT_BOOTSTRAP = {
  ssrHtml: '',
  ssrCss: '',
  ssrData: '',
  fnLocales: '',
  jsonData: {}
};
var COOKIE_NAMESPACE = 'mady';

(0, _all2.default)();

function sendIndexHtml(req, res) {
  mainStory.info('http', 'Preparing index.html...');
  var userLang = req.query.lang || req.cookies[COOKIE_NAMESPACE + '_lang'] || 'en';
  var bootstrap = (0, _lodash.cloneDeep)(DEFAULT_BOOTSTRAP);
  return _bluebird2.default.resolve()

  // Locales
  .then(function () {
    mainStory.debug('http', 'Getting locale code for lang ' + chalk.cyan.bold(userLang) + '...');

    var _t$getLocaleCode = _translate2.default.getLocaleCode(userLang);

    var lang = _t$getLocaleCode.lang;
    var result = _t$getLocaleCode.result;

    bootstrap.fnLocales = result;
    bootstrap.jsonData.lang = lang;
    bootstrap.jsonData.reactIntlMessages = (0, _all.getReactIntlMessages)(lang);
    if (lang && lang !== userLang) {
      mainStory.info('http', 'Serving locales for ' + chalk.cyan.bold(lang) + ' instead of ' + chalk.cyan.bold(userLang));
    }
  })

  // SSR
  .then(function () {
    if (!ssr) return null;
    mainStory.debug('http', 'Rendering...');
    return ssr.render(req, {
      lang: bootstrap.jsonData.lang,
      reactIntlMessages: bootstrap.jsonData.reactIntlMessages,
      fnLocales: bootstrap.fnLocales
    }).then(function (results) {
      mainStory.debug('http', 'Finished rendering');
      var ssrHtml = results.ssrHtml;
      var ssrCss = results.ssrCss;
      var relayData = results.relayData;

      bootstrap.ssrHtml = ssrHtml;
      bootstrap.ssrCss = ssrCss;
      bootstrap.jsonData.relayData = relayData;
    }).catch(function (err) {
      return mainStory.error('http', 'Error rendering', { attach: err });
    });
  }).catch(function (err) {
    return mainStory.error('http', 'Error preparing bootstrap', { attach: err });
  })

  // Render the result!
  .finally(function () {
    bootstrap.jsonData = JSON.stringify(bootstrap.jsonData);
    res.render('index.html', bootstrap);
    return;
  });
}

function init(options) {
  // TODO: webpack SSR if not pre-compiled
  ssr && ssr.init({ gqlServer: gqlServer, mainStory: mainStory });

  var expressApp = (0, _express2.default)();

  // Webpack middleware (for development)
  if (process.env.NODE_ENV !== 'production') {
    var compiler = webpack(webpackConfig);
    expressApp.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      quiet: false,
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true }
    }));
    expressApp.use(webpackHotMiddleware(compiler));
  }

  // Templating and other middleware
  expressApp.engine('html', _ejs2.default.renderFile);
  expressApp.set('views', _path2.default.join(__dirname, ASSET_PATH));
  expressApp.use((0, _compression2.default)());
  expressApp.use((0, _cookieParser2.default)());

  // GraphQL + GraphiQL
  expressApp.use('/graphql', (0, _expressGraphql2.default)({
    schema: gqlServer.getSchema(),
    graphiql: true
  }));

  // Index
  expressApp.use('/', function (req, res, next) {
    if (req.path === '/') {
      sendIndexHtml(req, res);
    } else {
      next();
    }
  });

  // Static assets
  expressApp.use(_express2.default.static(_path2.default.join(__dirname, ASSET_PATH)));

  // Create HTTP server
  var httpServer = _http2.default.createServer(expressApp);

  // Storyboard
  _storyboard2.default.addListener(_wsServer2.default, { httpServer: httpServer });

  // Look for a suitable port and start listening
  var port = options.port;
  httpServer.on('error', function () {
    mainStory.warn('http', 'Port ' + port + ' busy');
    port += 1;
    if (port >= options.port + 20) {
      mainStory.error('http', 'Cannot open port (tried 20 times)');
      return;
    }
    httpServer.listen(port);
  });
  httpServer.on('listening', function () {
    mainStory.info('http', 'Listening on port ' + chalk.cyan.bold(port));
  });
  httpServer.listen(port);
}

// ==============================================
// Public API
// ==============================================
// eslint-disable-next-line import/prefer-default-export
exports.init = init;