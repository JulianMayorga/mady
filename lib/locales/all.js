'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReactIntlMessages = exports.SUPPORTED_LOCALES = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _translate = require('../translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SUPPORTED_LOCALES = ['en', 'en-US', 'en-GB', 'ca', 'es'];

var addLocaleCode = function addLocaleCode(lang) {
  var langPath = _path2.default.join(__dirname, lang + '.js');
  var localeCode = _fs2.default.readFileSync(langPath, 'utf8');
  _translate2.default.addLocaleCode(lang, localeCode);
};

var reactIntlMessages = {};

var addAllLocales = function addAllLocales() {
  /* eslint-disable global-require */
  _translate2.default.addLocales('en', require('./en'));
  _translate2.default.addLocales('en-US', require('./en-US'));
  _translate2.default.addLocales('en-GB', require('./en-GB'));
  _translate2.default.addLocales('ca', require('./ca'));
  _translate2.default.addLocales('es', require('./es'));
  /* eslint-enable global-require */

  SUPPORTED_LOCALES.forEach(addLocaleCode);
  SUPPORTED_LOCALES.forEach(function (lang) {
    try {
      var reactIntlPath = _path2.default.join(__dirname, lang + '.reactIntl.json');
      reactIntlMessages[lang] = JSON.parse(_fs2.default.readFileSync(reactIntlPath, 'utf8'));
    } catch (err) {/* ignore */}
  });
};

var getReactIntlMessages = function getReactIntlMessages(lang) {
  return reactIntlMessages[lang];
};

// =======================================
// Public API
// =======================================
exports.default = addAllLocales;
exports.SUPPORTED_LOCALES = SUPPORTED_LOCALES;
exports.getReactIntlMessages = getReactIntlMessages;