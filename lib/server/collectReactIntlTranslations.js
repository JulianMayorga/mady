'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collectReactIntlTranslations;

var _storyboard = require('storyboard');

function collectReactIntlTranslations(_ref) {
  var lang = _ref.lang;
  var keys = _ref.keys;
  var translations = _ref.translations;
  var story = _ref.story;

  var logPrefix = 'Lang ' + _storyboard.chalk.magenta.bold(lang);

  story.info('compiler', logPrefix + ' Preparing translations for React Intl...');
  var finalTranslations = {};
  // We must always include those keys using curly braces, even if there is no translation
  Object.keys(keys).forEach(function (keyId) {
    var key = keys[keyId];
    var reactIntlId = key.reactIntlId;

    if (!reactIntlId) return;
    if (key.text.indexOf('{') >= 0) {
      finalTranslations[reactIntlId] = key.text;
    }
  });
  translations.forEach(function (translation) {
    var key = keys[translation.keyId];
    if (!key) return;
    var reactIntlId = key.reactIntlId;

    if (!reactIntlId) return;
    finalTranslations[reactIntlId] = translation.translation;
  });
  return finalTranslations;
}