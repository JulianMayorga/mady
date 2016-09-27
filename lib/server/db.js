'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveJson = exports.importV0 = exports.compileTranslations = exports.parseSrcFiles = exports.deleteTranslation = exports.updateTranslation = exports.createTranslation = exports.getTranslation = exports.getKeyTranslations = exports.getLangTranslations = exports.getTranslations = exports.deleteKey = exports.updateKey = exports.createKey = exports.getKey = exports.getKeys = exports.updateConfig = exports.getConfig = exports.init = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _timm = require('timm');

var _timm2 = _interopRequireDefault(_timm);

var _storyboard = require('storyboard');

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _base = require('../common/base64');

var _parseSources = require('./parseSources');

var _parseSources2 = _interopRequireDefault(_parseSources);

var _compileTranslations = require('./compileTranslations');

var _compileTranslations2 = _interopRequireDefault(_compileTranslations);

var _collectReactIntlTranslations = require('./collectReactIntlTranslations');

var _collectReactIntlTranslations2 = _interopRequireDefault(_collectReactIntlTranslations);

var _importData = require('./importData');

var importers = _interopRequireWildcard(_importData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DB_VERSION = 2;

var DEFAULT_CONFIG = {
  srcPaths: ['src'],
  srcExtensions: ['.js', '.jsx', '.coffee', '.cjsx'],
  langs: ['en'],
  msgFunctionNames: ['_t'],
  fMinify: false,
  dbVersion: DB_VERSION
};

var RESPONSE_DELAY = 0;

// ==============================================
// Init
// ==============================================
function init(options) {
  initLocaleDir(options);
  var fMigrated = initConfig();
  initKeys();
  initTranslations();
  if (fMigrated || options.fRecompile) compileTranslations();
}

// ==============================================
// Locale dir
// ==============================================
var _localeDir = null;

function initLocaleDir(options) {
  _localeDir = options.localeDir;
  try {
    _fsExtra2.default.statSync(_localeDir);
  } catch (err) {
    _storyboard.mainStory.debug('db', 'Creating folder ' + _storyboard.chalk.cyan.bold(_localeDir) + '...');
    _fsExtra2.default.mkdirSync(_localeDir);
  }
}

// ==============================================
// Config
// ==============================================
var _configPath = null;
var _config = null;

function initConfig() {
  _configPath = _path2.default.join(_localeDir, 'config.json');
  var fMigrated = false;
  try {
    _storyboard.mainStory.info('db', 'Reading file ' + _storyboard.chalk.cyan.bold(_configPath) + '...');
    _fsExtra2.default.statSync(_configPath);
    readConfig();
    if (_config.dbVersion !== DB_VERSION) {
      migrateDatabase(_config.dbVersion);
      _config.dbVersion = DB_VERSION;
      fMigrated = true;
    }
    _config = _timm2.default.addDefaults(_config, DEFAULT_CONFIG);
    saveConfig();
    return fMigrated;
  } catch (err) {
    _storyboard.mainStory.error('db', 'Error reading config: ' + err.message, { attach: err, attachLevel: 'trace' });
    _config = DEFAULT_CONFIG;
    saveConfig();
    return fMigrated;
  }
}

function readConfig() {
  _config = readJson(_configPath);
}
function saveConfig(options) {
  saveJson(_configPath, _config, options);
}

function getConfig() {
  return _config;
}

function updateConfig(newAttrs, _ref) {
  var story = _ref.story;

  _config = _timm2.default.merge(_config, newAttrs);
  story.debug('db', 'New config:', { attach: _config });
  saveConfig({ story: story });
  return compileTranslations({ story: story }).then(function () {
    return _config;
  });
}

// ==============================================
// Keys
// ==============================================
var _keyPath = null;
var _keys = {};

function initKeys() {
  _keyPath = _path2.default.join(_localeDir, 'keys.json');
  try {
    _fsExtra2.default.statSync(_keyPath);
  } catch (err) {
    saveKeys();
  } finally {
    _storyboard.mainStory.info('db', 'Reading file ' + _storyboard.chalk.cyan.bold(_keyPath) + '...');
    readKeys();
  }
}

function readKeys() {
  _keys = readJson(_keyPath);
}

function saveKeys(options) {
  saveJson(_keyPath, _keys, options);
}

function getKeys() {
  return Object.keys(_keys).map(function (id) {
    return _keys[id];
  });
}

function getKey(id) {
  return _keys[id];
}

function createKey(newAttrs) {
  var id = newAttrs.context != null ? newAttrs.context + '_' + newAttrs.text : newAttrs.text;
  _keys[id] = {
    id: id,
    context: newAttrs.context || null,
    text: newAttrs.text,
    firstUsed: newAttrs.firstUsed,
    unusedSince: newAttrs.unusedSince || null,
    sources: []
  };
  saveKeys();
  return compileTranslations().then(function () {
    return _keys[id];
  });
}

function updateKey(id, newAttrs) {
  _keys[id] = _timm2.default.merge(_keys[id], newAttrs);
  saveKeys();
  return compileTranslations().then(function () {
    return _keys[id];
  });
}

function deleteKey(id) {
  var item = _keys[id];
  delete _keys[id];
  saveKeys();
  return compileTranslations().delay(RESPONSE_DELAY).then(function () {
    return item;
  });
}

function parseSrcFiles(_ref2) {
  var story = _ref2.story;
  var _config2 = _config;
  var srcPaths = _config2.srcPaths;
  var srcExtensions = _config2.srcExtensions;
  var msgFunctionNames = _config2.msgFunctionNames;

  var curKeys = (0, _parseSources2.default)({ srcPaths: srcPaths, srcExtensions: srcExtensions, msgFunctionNames: msgFunctionNames, story: story });
  var now = new Date().toISOString();

  var unusedKeys = [];
  Object.keys(_keys).forEach(function (id) {
    var key = _keys[id];
    if (curKeys[id]) {
      curKeys[id].firstUsed = key.firstUsed;
    } else {
      unusedKeys.push(id);
      curKeys[id] = key;
      key.unusedSince = key.unusedSince || now;
      key.sources = [];
    }
  });
  if (unusedKeys.length) {
    story.debug('db', _storyboard.chalk.bold('Unused') + ' keys: ' + unusedKeys.length, {
      attach: unusedKeys.map(_base.base64ToUtf8)
    });
  }

  var newKeys = [];
  Object.keys(curKeys).forEach(function (id) {
    var key = curKeys[id];
    if (!key.firstUsed) {
      newKeys.push(id);
      key.firstUsed = now;
    }
    _keys[id] = key;
  });
  if (newKeys.length) {
    story.debug('db', _storyboard.chalk.bold('New') + ' keys: ' + newKeys.length, {
      attach: newKeys.map(_base.base64ToUtf8)
    });
  }

  saveKeys({ story: story });
  return compileTranslations({ story: story }).then(function () {
    return _keys;
  });
}

// ==============================================
// Translations
// ==============================================
var getLangPath = function getLangPath(lang) {
  return _path2.default.join(_localeDir, lang + '.json');
};
var getCompiledLangPath = function getCompiledLangPath(lang) {
  return _path2.default.join(_localeDir, lang + '.js');
};
var getReactIntlLangPath = function getReactIntlLangPath(lang) {
  return _path2.default.join(_localeDir, lang + '.reactIntl.json');
};
var _translations = {};

function initTranslations() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _config.langs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var lang = _step.value;

      var langPath = getLangPath(lang);
      try {
        _fsExtra2.default.statSync(langPath);
      } catch (err) {
        saveJson(langPath, {});
      } finally {
        _storyboard.mainStory.info('db', 'Reading file ' + _storyboard.chalk.cyan.bold(langPath) + '...');
        readTranslations(lang);
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
}

function readTranslations(lang) {
  var translations = readJson(getLangPath(lang));
  if (translations) {
    _translations = _timm2.default.merge(_translations, translations);
  }
}

function saveTranslations(lang, options) {
  var langTranslations = {};
  Object.keys(_translations).forEach(function (translationId) {
    var translation = _translations[translationId];
    if (translation.lang === lang) {
      langTranslations[translation.id] = translation;
    }
  });
  saveJson(getLangPath(lang), langTranslations, options);
}

function getTranslations() {
  return Object.keys(_translations).map(function (id) {
    return _translations[id];
  });
}

function getLangTranslations(lang) {
  var out = [];
  Object.keys(_translations).forEach(function (translationId) {
    var translation = _translations[translationId];
    if (translation.lang === lang) {
      out.push(translation);
    }
  });
  return out;
}

function getKeyTranslations(keyId) {
  var out = [];
  Object.keys(_translations).forEach(function (translationId) {
    var translation = _translations[translationId];
    if (translation.keyId === keyId) {
      out.push(translation);
    }
  });
  return out;
}

function getTranslation(id) {
  return _translations[id];
}

function createTranslation(newAttrs, _ref3) {
  var story = _ref3.story;
  var lang = newAttrs.lang;
  var translation = newAttrs.translation;
  var keyId = newAttrs.keyId;

  if (!lang) throw new Error('Translation language must be specified');
  if (keyId == null) throw new Error('Translation key must be specified');
  var id = _nodeUuid2.default.v4();
  _translations[id] = { id: id, lang: lang, translation: translation, keyId: keyId };
  saveTranslations(lang, { story: story });
  return compileTranslations({ story: story }).delay(RESPONSE_DELAY).then(function () {
    return _translations[id];
  });
}

function updateTranslation(id, newAttrs, _ref4) {
  var story = _ref4.story;

  _translations[id] = _timm2.default.merge(_translations[id], newAttrs);
  saveTranslations(_translations[id].lang, { story: story });
  return compileTranslations({ story: story }).delay(RESPONSE_DELAY).then(function () {
    return _translations[id];
  });
}

function deleteTranslation(id, _ref5) {
  var story = _ref5.story;

  var item = _translations[id];
  var lang = _translations[id].lang;

  delete _translations[id];
  saveTranslations(lang, { story: story });
  return compileTranslations({ story: story }).delay(RESPONSE_DELAY).then(function () {
    return item;
  });
}

function compileTranslations() {
  var _ref6 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var baseStory = _ref6.story;

  var story = (baseStory || _storyboard.mainStory).child({ src: 'db', title: 'Compile translations' });
  return _bluebird2.default.resolve().then(function () {
    var _config3 = _config;
    var fMinify = _config3.fMinify;
    var langs = _config3.langs;

    var allTranslations = getAllTranslations(langs, story);
    Object.keys(allTranslations).forEach(function (lang) {
      var compiledLangPath = getCompiledLangPath(lang);
      var translations = allTranslations[lang];
      var fnTranslate = (0, _compileTranslations2.default)({
        lang: lang,
        keys: _keys,
        translations: translations,
        fMinify: fMinify,
        story: story
      });
      story.debug('db', 'Writing file ' + _storyboard.chalk.cyan.bold(compiledLangPath) + '...');
      _fsExtra2.default.writeFileSync(compiledLangPath, fnTranslate, 'utf8');
      var reactIntlLangPath = getReactIntlLangPath(lang);
      var reactIntlMessages = (0, _collectReactIntlTranslations2.default)({
        lang: lang,
        keys: _keys,
        translations: translations,
        story: story
      });
      saveJson(reactIntlLangPath, reactIntlMessages, { story: story });
    });
  }).catch(function (err) {
    story.error('db', 'Could not compile translations:', { attach: err });
    throw err;
  }).finally(function () {
    return story.close();
  });
}

// function objToArray(obj) {
//   const out = [];
//   Object.keys(obj).forEach(key => {
//     out.push(obj[key]);
//   });
//   return out;
// }

function getAllTranslations(langs /* , story */) {
  // Determine lang structure
  var langStructure = {};
  var sortedLangs = langs.slice().sort();
  // story.debug('db', 'Sorted languages', { attach: sortedLangs });
  sortedLangs.forEach(function (lang) {
    langStructure[lang] = { parent: null, children: [] };
    var tokens = lang.split(/[_-]/);
    for (var i = 0; i < tokens.length; i++) {
      var tmpLang = tokens.slice(0, i + 1).join('-');
      if (!langStructure[tmpLang]) langStructure[tmpLang] = { parent: null, children: [] };
      if (i > 0) {
        var parentLang = tokens.slice(0, i).join('-');
        langStructure[parentLang].children.push(tmpLang);
        langStructure[tmpLang].parent = parentLang;
      }
    }
  });
  // story.debug('db', 'Language tree', { attach: langStructure });

  // Collect all translations for languages, from top to bottom:
  // - Add all children translations (backup)
  // - Add ancestor translations (including those coming up from other branches)
  // - Add own translations
  // This algorithm may result in multiple translations for the same key, but the latest one
  // should have higher priority (this is used by `compileTranslations()` during flattening).
  // Higher priority is guaranteed by the order in which languages are processed,
  // and the order in which translations are added to the array.
  var allLangs = Object.keys(langStructure).sort();
  allLangs.forEach(function (lang) {
    var childrenTranslations = getChildrenTranslations(langStructure, lang, []);
    // story.debug('db', `Children translations for ${lang}`, { attach: childrenTranslations });
    var parentTranslations = getParentTranslations(langStructure, lang);
    // story.debug('db', `Parent translations for ${lang}`, { attach: parentTranslations });
    var ownTranslations = getLangTranslations(lang);
    // story.debug('db', `Own translations for ${lang}`, { attach: ownTranslations });
    langStructure[lang].translations = childrenTranslations.concat(parentTranslations, ownTranslations);
  });

  // Replace lang structure by the translations themselves
  var out = {};
  Object.keys(langStructure).forEach(function (lang) {
    out[lang] = langStructure[lang].translations;
  });
  // story.debug('db', 'All translations', { attach: out });
  return out;
}

function getChildrenTranslations(langStructure, lang, translations0) {
  var translations = translations0;
  langStructure[lang].children.forEach(function (childLang) {
    translations = translations.concat(getLangTranslations(childLang));
    translations = getChildrenTranslations(langStructure, childLang, translations);
  });
  return translations;
}

function getParentTranslations(langStructure, lang) {
  var out = [];
  var tokens = lang.split(/[_-]/);
  if (tokens.length < 1) return out;
  for (var i = 0; i < tokens.length - 1; i++) {
    var tmpLang = tokens.slice(0, i + 1).join('-');
    out = out.concat(langStructure[tmpLang].translations);
  }
  return out;
}

// ==============================================
// Merge keys and translations from old stores
// ==============================================
function importV0(dir) {
  var story = _storyboard.mainStory.child({ src: 'db', title: 'Import v0' });

  var _importers$importV = importers.importV0({
    langs: _config.langs,
    keys: _keys,
    translations: _translations,
    dir: dir, story: story
  });

  var langs = _importers$importV.langs;
  var keys = _importers$importV.keys;
  var translations = _importers$importV.translations;

  if (langs !== _config.langs) updateConfig({ langs: langs }, { story: story });
  if (keys !== _keys) {
    _keys = keys;
    saveKeys({ story: story });
  }
  if (translations !== _translations) {
    _translations = translations;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _config.langs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var lang = _step2.value;

        saveTranslations(lang, { story: story });
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
  compileTranslations();
  story.close();
}

function migrateDatabase(prevDbVersion) {
  var story = _storyboard.mainStory.child({
    src: 'db',
    title: 'Upgrade DB ' + prevDbVersion + ' -> ' + DB_VERSION
  });
  if (prevDbVersion == null || prevDbVersion < 2) {
    importers.importToV2({ langs: _config.langs, dir: _localeDir, story: story });
  }
  story.close();
}

// ==============================================
// Helpers
// ==============================================
function readJson(filePath) {
  return JSON.parse(_fsExtra2.default.readFileSync(filePath, 'utf8'));
}

function saveJson(filePath, obj) {
  var _ref7 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref7$story = _ref7.story;
  var story = _ref7$story === undefined ? _storyboard.mainStory : _ref7$story;

  story.debug('db', 'Writing file ' + _storyboard.chalk.cyan.bold(filePath) + '...');
  _fsExtra2.default.writeFileSync(filePath, JSON.stringify(obj, null, '  '), 'utf8');
}

// ==============================================
// Public API
// ==============================================
exports.init = init;
exports.getConfig = getConfig;
exports.updateConfig = updateConfig;
exports.getKeys = getKeys;
exports.getKey = getKey;
exports.createKey = createKey;
exports.updateKey = updateKey;
exports.deleteKey = deleteKey;
exports.getTranslations = getTranslations;
exports.getLangTranslations = getLangTranslations;
exports.getKeyTranslations = getKeyTranslations;
exports.getTranslation = getTranslation;
exports.createTranslation = createTranslation;
exports.updateTranslation = updateTranslation;
exports.deleteTranslation = deleteTranslation;
exports.parseSrcFiles = parseSrcFiles;
exports.compileTranslations = compileTranslations;
exports.importV0 = importV0;
exports.saveJson = saveJson;