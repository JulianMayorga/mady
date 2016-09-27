'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importToV2 = exports.importV0 = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _timm = require('timm');

var _timm2 = _interopRequireDefault(_timm);

var _storyboard = require('storyboard');

var _diveSync = require('diveSync');

var _diveSync2 = _interopRequireDefault(_diveSync);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _base = require('../common/base64');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function duplicatedTranslation(translations, newKeyId, newLang, newTranslation) {
  var fFound = false;
  var ids = Object.keys(translations);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;
      var _translations$id = translations[id];
      var keyId = _translations$id.keyId;
      var lang = _translations$id.lang;
      var translation = _translations$id.translation;

      if (newKeyId === keyId && newLang === lang && newTranslation === translation) {
        fFound = true;
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return fFound;
}

function importV0(_ref) {
  var langs = _ref.langs;
  var keys = _ref.keys;
  var translations = _ref.translations;
  var dir = _ref.dir;
  var story = _ref.story;

  var outK = keys;
  var outT = translations;
  var outLangs = langs;
  var diveOptions = {
    filter: function filter(filePath, fDir) {
      return fDir || _path2.default.extname(filePath) === '.json';
    }
  };
  var totNewK = 0;
  var totNewT = 0;
  var diveProcess = function diveProcess(err, filePath) {
    var finalFilePath = _path2.default.normalize(filePath);
    story.info('importData', 'Processing ' + _storyboard.chalk.cyan.bold(finalFilePath) + '...');
    var lang = _path2.default.basename(filePath, '.json').replace(/_/gi, '-');
    if (outLangs.indexOf(lang) < 0) {
      outLangs = _timm2.default.addLast(outLangs, lang);
    }
    var js = JSON.parse(_fs2.default.readFileSync(finalFilePath));
    var numNewK = 0;
    var numNewT = 0;
    Object.keys(js).forEach(function (keyId) {
      var newTranslation = js[keyId];
      var fTranslated = newTranslation.fTranslated;
      var context = newTranslation.context;
      var text = newTranslation.original;
      var translation = newTranslation.translation;
      var firstUsed = newTranslation.firstUsed;
      var unusedSince = newTranslation.unusedSince;
      var sources = newTranslation.sources;

      // Add key if new

      if (!outK[keyId]) {
        outK = _timm2.default.set(outK, keyId, {
          id: keyId,
          context: context, text: text,
          firstUsed: firstUsed, unusedSince: unusedSince,
          sources: sources
        });
        numNewK += 1;
        totNewK += 1;
      }

      // Add translation if translated
      if (fTranslated) {
        if (!duplicatedTranslation(translations, keyId, lang, translation)) {
          var translationId = _nodeUuid2.default.v4();
          outT = _timm2.default.set(outT, translationId, {
            id: translationId,
            lang: lang,
            translation: translation,
            keyId: keyId
          });
          numNewT += 1;
          totNewT += 1;
        }
      }
    });
    story.info('importData', 'Lang ' + _storyboard.chalk.magenta.bold(lang) + ': new keys ' + numNewK + ', new translations ' + numNewT);
  };
  (0, _diveSync2.default)(dir, diveOptions, diveProcess);
  story.info('importData', 'Total: new keys ' + totNewK + ', new translations ' + totNewT);
  return { keys: outK, translations: outT, langs: outLangs };
}

function importToV2(_ref2) {
  var langs = _ref2.langs;
  var dir = _ref2.dir;
  var story = _ref2.story;

  // Import keys
  story.info('importData', 'Processing keys...');
  var keyPath = _path2.default.join(dir, 'keys.json');
  var prevKeys = JSON.parse(_fs2.default.readFileSync(keyPath));
  var nextKeys = {};
  Object.keys(prevKeys).forEach(function (id) {
    var keyData = prevKeys[id];
    var nextId = (0, _base.utf8ToBase64)(id);
    nextKeys[nextId] = _timm2.default.set(keyData, 'id', nextId);
  });
  _fs2.default.writeFileSync(keyPath, JSON.stringify(nextKeys, null, '  '), 'utf8');

  // Import translations
  langs.forEach(function (lang) {
    story.info('importData', 'Processing translations: ' + lang + '...');
    var translationPath = _path2.default.join(dir, lang + '.json');
    var translations = JSON.parse(_fs2.default.readFileSync(translationPath));
    Object.keys(translations).forEach(function (id) {
      var translation = translations[id];
      translation.keyId = (0, _base.utf8ToBase64)(translation.keyId);
    });
    _fs2.default.writeFileSync(translationPath, JSON.stringify(translations, null, '  '), 'utf8');
  });
}

// ==============================================
// Public API
// ==============================================
exports.importV0 = importV0;
exports.importToV2 = importToV2;