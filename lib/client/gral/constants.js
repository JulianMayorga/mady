'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LANG_OPTIONS = exports.COLORS = undefined;

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_COLOR = (0, _tinycolor2.default)('aliceblue').spin(40).toHexString();
var BASE_COLOR2 = (0, _tinycolor2.default)('aliceblue').spin(10).toHexString();
var COLORS = {
  light: BASE_COLOR,
  lightAlt: BASE_COLOR2,
  medium: (0, _tinycolor2.default)(BASE_COLOR).darken(5).toHexString(),
  mediumAlt: (0, _tinycolor2.default)(BASE_COLOR2).darken(5).toHexString(),
  dark: (0, _tinycolor2.default)(BASE_COLOR).darken(10).toHexString(),
  darkest: (0, _tinycolor2.default)(BASE_COLOR).darken(65).toHexString(),
  dim: '#999'
};

var LANG_OPTIONS = [{
  value: 'en',
  label: 'English'
}, {
  value: 'es',
  label: 'Español'
}, {
  value: 'ca',
  label: 'Català'
}];

// ==========================================
// Public API
// ==========================================
exports.COLORS = COLORS;
exports.LANG_OPTIONS = LANG_OPTIONS;