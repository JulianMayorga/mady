'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compileTranslations;

var _messageformat = require('messageformat');

var _messageformat2 = _interopRequireDefault(_messageformat);

var _uglifyJs = require('uglify-js');

var _uglifyJs2 = _interopRequireDefault(_uglifyJs);

var _storyboard = require('storyboard');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compileTranslations(_ref) {
  var lang = _ref.lang;
  var keys = _ref.keys;
  var translations = _ref.translations;
  var _ref$fMinify = _ref.fMinify;
  var fMinify = _ref$fMinify === undefined ? false : _ref$fMinify;
  var story = _ref.story;

  var logPrefix = 'Lang ' + _storyboard.chalk.magenta.bold(lang);

  story.info('compiler', logPrefix + ' Preparing translations...');
  var finalTranslations = {};
  // We must always include those keys using curly braces, even if there is no translation
  Object.keys(keys).forEach(function (keyId) {
    if (keys[keyId].text.indexOf('{') >= 0) {
      finalTranslations[keyId] = keys[keyId].text;
    }
  });
  translations.forEach(function (translation) {
    finalTranslations[translation.keyId] = translation.translation;
  });
  story.debug('compiler', logPrefix + ' Translations prepared', {
    attach: finalTranslations,
    attachLevel: 'TRACE'
  });

  story.info('compiler', logPrefix + ' Precompiling...');
  var mf = new _messageformat2.default(lang);
  var fnTranslate = mf.compile(finalTranslations).toString();
  /* eslint-disable prefer-template */
  fnTranslate = '/* eslint-disable */\n' + fnTranslate + ';\nmodule.exports = anonymous();\n/* eslint-enable */\n';
  /* eslint-enable prefer-template */
  story.debug('compiler', logPrefix + ' Precompiled', {
    attach: fnTranslate,
    attachLevel: 'TRACE'
  });

  if (fMinify) {
    story.info('compiler', logPrefix + ' Minifying...');
    fnTranslate = _uglifyJs2.default.minify(fnTranslate, { fromString: true }).code;
    story.debug('compiler', logPrefix + ' Minified', {
      attach: fnTranslate,
      attachLevel: 'TRACE'
    });
  } else {
    story.info('compiler', logPrefix + ' Skipped minification');
  }

  return fnTranslate;
}