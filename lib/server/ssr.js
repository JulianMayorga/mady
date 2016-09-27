'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.render = render;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isomorphicRelay = require('isomorphic-relay');

var _isomorphicRelay2 = _interopRequireDefault(_isomorphicRelay);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _storage = require('../client/gral/storage');

var _app = require('../client/components/010-app');

var _app2 = _interopRequireDefault(_app);

var _rootQueries = require('../client/gral/rootQueries');

var _translate = require('../translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gqlServer = void 0;
var mainStory = void 0;

var SSR_CSS_PATH = _path2.default.resolve(__dirname, './ssr.bundle.css');
var ssrCss = _fs2.default.readFileSync(SSR_CSS_PATH);

function processQuery(queryRequest, idx) {
  mainStory.debug('ssr', 'Running query #' + idx + '...');
  var query = queryRequest.getQueryString();
  var vars = queryRequest.getVariables();
  return gqlServer.runQuery(query, null, null, vars).then(function (result) {
    var out = void 0;
    if (result.errors) {
      mainStory.error('ssr', 'SSR query failed', { attach: result.errors });
      out = queryRequest.reject(new Error('SSR_ERROR'));
    } else {
      mainStory.debug('ssr', 'SSR query succeeded');
      out = queryRequest.resolve({ response: result.data });
    }
    return out;
  }).catch(function (err) {
    mainStory.error('ssr', 'SSR query failed', { attach: err });
  });
}

var networkLayer = {
  sendMutation: function sendMutation() {
    return _bluebird2.default.resolve();
  },
  sendQueries: function sendQueries(queryReqs) {
    mainStory.debug('ssr', 'Received ' + queryReqs.length + ' queries');
    return _bluebird2.default.all(queryReqs.map(processQuery));
  },
  supports: function supports() {
    return false;
  }
};

function init() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  gqlServer = options.gqlServer;
  mainStory = options.mainStory;
  if (!gqlServer || !mainStory) {
    throw new Error('Missing dependencies');
  }
  mainStory.info('ssr', 'Initialised');
}

function render(req, _ref) {
  var fnLocales = _ref.fnLocales;

  return _bluebird2.default.resolve().then(function () {
    mainStory.info('ssr', 'Rendering...');
    var rootContainerProps = {
      Container: _app2.default,
      queryConfig: new _rootQueries.ViewerQuery()
    };
    return _isomorphicRelay2.default.prepareData(rootContainerProps, networkLayer);
  }).then(function (_ref2) {
    var relayData = _ref2.data;
    var props = _ref2.props;

    // Everything here must be synchronous so that rendering works correctly!
    var el = _react2.default.createElement(_isomorphicRelay2.default.Renderer, props);
    /* eslint-disable no-eval */
    _translate2.default.setLocales(eval(fnLocales));
    /* eslint-enable no-eval */
    (0, _storage.setCurrentCookies)(req.cookies);
    var ssrHtml = _server2.default.renderToString(el);
    return { ssrHtml: ssrHtml, ssrCss: ssrCss, relayData: relayData };
  });
}