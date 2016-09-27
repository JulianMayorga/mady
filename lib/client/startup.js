'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-env browser */


require('babel-polyfill');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _storyboard = require('storyboard');

var _wsClient = require('storyboard/lib/listeners/wsClient');

var _wsClient2 = _interopRequireDefault(_wsClient);

var _browserExtension = require('storyboard/lib/listeners/browserExtension');

var _browserExtension2 = _interopRequireDefault(_browserExtension);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _isomorphicRelay = require('isomorphic-relay');

var _isomorphicRelay2 = _interopRequireDefault(_isomorphicRelay);

var _app = require('./components/010-app');

var _app2 = _interopRequireDefault(_app);

var _rootQueries = require('./gral/rootQueries');

var _translate = require('../translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storyboard.addListener)(_wsClient2.default);
(0, _storyboard.addListener)(_browserExtension2.default);

if (process.env.NODE_ENV !== 'production') _bluebird2.default.longStackTraces();

_storyboard.mainStory.info('startup', 'Launching...');

// Process bootstrap: set up language and delete prerendered styles
_translate2.default.setLocales(window.AppBootstrap.locales);
_moment2.default.locale(window.AppBootstrap.lang);
var preRenderedStyles = document.getElementById('preRenderedStyles');
if (preRenderedStyles) {
  document.getElementsByTagName('head')[0].removeChild(preRenderedStyles);
}

var rootElement = document.getElementById('app');

if (window.AppBootstrap.relayData) {
  var environment = _reactRelay2.default.Store;

  // Comment out the following line if you find issues with the way the
  // client-side Relay store is initialised (esp. wrt. mutations doing erratic things)
  _isomorphicRelay2.default.injectPreparedData(environment, window.AppBootstrap.relayData);

  var rootContainerProps = {
    Container: _app2.default,
    queryConfig: new _rootQueries.ViewerQuery()
  };
  _isomorphicRelay2.default.prepareInitialRender(_extends({}, rootContainerProps, { environment: environment })).then(function (props) {
    _reactDom2.default.render(_react2.default.createElement(_isomorphicRelay2.default.Renderer, props), rootElement);
  });
} else {
  _reactDom2.default.render(_react2.default.createElement(_reactRelay2.default.RootContainer, {
    Component: _app2.default,
    route: new _rootQueries.ViewerQuery()
  }), rootElement);
}