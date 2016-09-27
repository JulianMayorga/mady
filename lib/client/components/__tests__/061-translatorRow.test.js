'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-env jest */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _giu = require('giu');

var _translatorRow = require('../061-translatorRow');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/facebook/react/issues/7386#issuecomment-238091398
jest.mock('react-dom');
jest.mock('../062-translation', function () {
  return jest.fn(function (props) {
    return _react2.default.createElement('div', _extends({ dataMockType: 'Translation' }, props));
  });
});
// jest.mock('../062-translation', mockReactComponent('Translation'));

// ======================================================
// Fixtures
// ======================================================
var VIEWER = { id: 'me' };

var KEY_WITHOUT_TRANSLATIONS = {
  id: 'keyId1',
  context: 'someContext',
  text: 'A message',
  unusedSince: null,
  // unusedSince: '2016-04-20T11:33:38.450Z',
  translations: { edges: [] }
};

var KEY_WITH_TRANSLATIONS = {
  id: 'keyId2',
  context: 'someContext',
  text: 'A message',
  unusedSince: null,
  translations: { edges: [{ node: {
        id: 'translationId1',
        lang: 'es',
        translation: 'Un mensaje'
      } }, { node: {
        id: 'translationId2',
        lang: 'ca',
        translation: 'Un missatge'
      } }] }
};

var STYLE_KEY_COL = (0, _giu.flexItem)('1 1 0px', {
  backgroundColor: 'white',
  marginRight: 5,
  paddingLeft: 5,
  paddingRight: 17
});

var STYLE_LANG_COL = (0, _giu.flexItem)('1 1 0px', {
  backgroundColor: 'white',
  marginRight: 5,
  paddingLeft: 5,
  paddingRight: 5
});

// ======================================================
// Tests
// ======================================================
describe('HoverableTranslatorRow', function () {
  it('renders correctly a key without translations', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_translatorRow._HoverableTranslatorRow, {
      theKey: KEY_WITHOUT_TRANSLATIONS,
      viewer: VIEWER,
      langs: ['es', 'ca'],
      fSelected: false,
      changeSelectedKey: function changeSelectedKey() {},
      styleKeyCol: STYLE_KEY_COL,
      styleLangCol: STYLE_LANG_COL
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly a key with translations', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_translatorRow._HoverableTranslatorRow, {
      theKey: KEY_WITH_TRANSLATIONS,
      viewer: VIEWER,
      langs: ['es', 'ca'],
      fSelected: false,
      changeSelectedKey: function changeSelectedKey() {},
      styleKeyCol: STYLE_KEY_COL,
      styleLangCol: STYLE_LANG_COL
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly a selected key', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_translatorRow._HoverableTranslatorRow, {
      theKey: KEY_WITHOUT_TRANSLATIONS,
      viewer: VIEWER,
      langs: ['es', 'ca'],
      fSelected: true,
      changeSelectedKey: function changeSelectedKey() {},
      styleKeyCol: STYLE_KEY_COL,
      styleLangCol: STYLE_LANG_COL
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('reacts to clicks, changing the selected key', function () {
    var spyChangeSelectedKey = jest.fn();
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_translatorRow._HoverableTranslatorRow, {
      theKey: KEY_WITHOUT_TRANSLATIONS,
      viewer: VIEWER,
      langs: ['es', 'ca'],
      fSelected: false,
      changeSelectedKey: spyChangeSelectedKey,
      styleKeyCol: STYLE_KEY_COL,
      styleLangCol: STYLE_LANG_COL
    })).toJSON();
    tree.props.onClick();
    expect(spyChangeSelectedKey).toBeCalledWith(KEY_WITHOUT_TRANSLATIONS.id);
  });
});