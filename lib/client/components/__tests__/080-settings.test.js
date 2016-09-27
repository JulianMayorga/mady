'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _giu = require('giu');

var _settings = require('../080-settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/facebook/react/issues/7386#issuecomment-238091398
/* eslint-env jest */
jest.mock('react-dom');

describe('Settings', function () {
  it('renders correctly', function () {
    var viewer = {
      id: 'me',
      config: {
        langs: ['en', 'es'],
        srcPaths: ['src'],
        srcExtensions: ['.js', '.jsx'],
        msgFunctionNames: ['_t'],
        fMinify: false
      }
    };
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_giu.Floats, null),
      _react2.default.createElement(_settings._Settings, {
        lang: 'en',
        viewer: viewer,
        onChangeLang: function onChangeLang() {},
        onClose: function onClose() {}
      })
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });
});