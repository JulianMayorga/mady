'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _giu = require('giu');

var _translation = require('../062-translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/facebook/react/issues/7386#issuecomment-238091398
/* eslint-env jest */
jest.mock('react-dom');

// ======================================================
// Fixtures
// ======================================================
var KEY = {
  id: 'keyId',
  text: 'A message'
};

var TRANSLATION = {
  id: 'translationId',
  lang: 'es',
  translation: 'Un mensaje'
};

// ======================================================
// Tests
// ======================================================
describe('HoverableTranslation', function () {
  it('renders correctly without translation', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_giu.Floats, null),
      _react2.default.createElement(_translation._HoverableTranslation, {
        theKey: KEY,
        lang: 'es',
        translation: null,
        changeSelectedKey: function changeSelectedKey() {}
      })
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with translation', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_giu.Floats, null),
      _react2.default.createElement(_translation._HoverableTranslation, {
        theKey: KEY,
        lang: 'es',
        translation: TRANSLATION,
        changeSelectedKey: function changeSelectedKey() {}
      })
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });
});