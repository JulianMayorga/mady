'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-env browser */
/* eslint-disable global-require */
var Cookie = !process.env.SERVER_SIDE_RENDERING && require('tiny-cookie');
/* eslint-enable global-require */
var NAMESPACE = 'mady';

// SSR
var currentCookies = null;

function localGet(key) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var out = options.defaultValue;
  try {
    out = JSON.parse(localStorage[NAMESPACE + '_' + key]);
  } catch (err) {/* ignore */}
  return out;
}

function localSet(key, val) {
  try {
    localStorage[NAMESPACE + '_' + key] = JSON.stringify(val);
  } catch (err) {/* ignore */}
}

// Note: tiny-cookie does not distinguish between undefined cookies
// and null-valued ones...
function cookieGet(key) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var out = void 0;
  var fullKey = NAMESPACE + '_' + key;
  try {
    var raw = currentCookies ? currentCookies[fullKey] : Cookie.getRaw(fullKey);
    out = JSON.parse(raw);
  } catch (err) {/* ignore */}
  if (out == null) out = options.defaultValue;
  return out;
}

function cookieSet(key, val) {
  try {
    var cookieOptions = { expires: '5Y' };
    Cookie.setRaw(NAMESPACE + '_' + key, JSON.stringify(val), cookieOptions);
  } catch (err) {/* ignore */}
}

// SSR
function setCurrentCookies(cookies) {
  currentCookies = cookies;
}

// ==========================================
// Public API
// ==========================================
exports.localGet = localGet;
exports.localSet = localSet;
exports.cookieGet = cookieGet;
exports.cookieSet = cookieSet;
exports.setCurrentCookies = setCurrentCookies;