'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _timm = require('timm');

var _giu = require('giu');

var _translate = require('../../translate');

var _translate2 = _interopRequireDefault(_translate);

var _constants = require('../gral/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ==========================================
// Component
// ==========================================
var PROP_TYPES = {
  onShowSettings: _react2.default.PropTypes.func.isRequired
};

var Header = function Header(_ref) {
  var onShowSettings = _ref.onShowSettings;
  return _react2.default.createElement(
    'div',
    { style: style.outer },
    _react2.default.createElement('div', { style: style.spacer }),
    _react2.default.createElement(
      'div',
      { style: style.title },
      'MADY',
      _react2.default.createElement(_giu.Icon, {
        id: 'madyBtnSettings',
        icon: 'cog',
        title: (0, _translate2.default)('tooltip_Settings'),
        onClick: onShowSettings,
        style: style.icon
      })
    ),
    _react2.default.createElement(
      'div',
      { style: (0, _timm.merge)(style.spacer, style.help) },
      _react2.default.createElement(_giu.Icon, { icon: 'question-circle', onClick: function onClick() {
          return (0, _giu.hintShow)('main', true);
        } })
    )
  );
};

Header.propTypes = PROP_TYPES;

// ==========================================
// Styles
// ==========================================
var style = {
  outer: (0, _giu.flexItem)('0 0 2.5em', (0, _giu.flexContainer)('row', {
    backgroundColor: _constants.COLORS.medium,
    padding: '5px 8px',
    alignItems: 'center'
  })),
  title: {
    fontWeight: 900,
    letterSpacing: 3,
    fontSize: '1.3em'
  },
  spacer: (0, _giu.flexItem)('1'),
  icon: {
    marginLeft: 10
  },
  help: {
    fontWeight: 900,
    letterSpacing: 3,
    fontSize: '1.3em',
    textAlign: 'right',
    marginRight: 10
  }
};

// ==========================================
// Public API
// ==========================================
exports.default = Header;