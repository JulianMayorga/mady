'use strict';

var _base = require('./common/base64');

// Current locales
var _locales = {};

// Caches
var allLocales = {};
var allLocaleCode = {};
var keyCache = {};

var translate = function translate(utf8, data) {
  var base64 = keyCache[utf8];
  if (base64 == null) base64 = keyCache[utf8] = (0, _base.utf8ToBase64)(utf8);
  var fnTranslate = _locales[base64];
  var out = void 0;
  if (fnTranslate) {
    out = fnTranslate(data);
  } else {
    out = utf8;
    var contextSeparatorIndex = out.indexOf('_');
    if (contextSeparatorIndex >= 0) {
      out = out.substring(contextSeparatorIndex + 1, out.length);
    }
  }
  out = out.trim();
  return out;
};

var getLocaleOrLocaleCode = function getLocaleOrLocaleCode(cache, initialLang) {
  var result = null;
  var lang = initialLang;
  while (!(result = cache[lang])) {
    lang = _t.getParentBcp47(lang);
    if (!lang) break;
  }
  return { lang: lang, result: result };
};

var _t = translate;

_t.addLocales = function (lang, locales) {
  allLocales[lang] = locales;
};
_t.addLocaleCode = function (lang, localeCode) {
  allLocaleCode[lang] = localeCode;
};

_t.setLocales = function (langOrLocales) {
  var out = null;
  if (typeof langOrLocales === 'string') {
    var _getLocaleOrLocaleCod = getLocaleOrLocaleCode(allLocales, langOrLocales);

    var lang = _getLocaleOrLocaleCod.lang;
    var result = _getLocaleOrLocaleCod.result;

    if (lang) _locales = result;
    out = lang;
  } else {
    _locales = langOrLocales;
  }
  return out;
};

_t.getLocales = function (lang) {
  return getLocaleOrLocaleCode(allLocales, lang);
};
_t.getLocaleCode = function (lang) {
  return getLocaleOrLocaleCode(allLocaleCode, lang);
};

_t.getParentBcp47 = function (bcp47) {
  var tokens = bcp47.replace(/_/g, '-').split('-');
  if (tokens.length <= 1) return null;
  return tokens.slice(0, tokens.length - 1).join('-');
};

// =======================================
// Public API
// =======================================
module.exports = _t;