'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable global-require */


exports.default = parse;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _slash = require('slash');

var _slash2 = _interopRequireDefault(_slash);

var _storyboard = require('storyboard');

var _diveSync = require('diveSync');

var _diveSync2 = _interopRequireDefault(_diveSync);

var _base = require('../common/base64');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Enable react-intl integration only when we have the necessary packages
var fReactIntl = false;
var babelCore = void 0;
var babelConfig = {
  presets: [],
  plugins: ['react-intl']
};
try {
  babelCore = require('babel-core');
  require('babel-plugin-react-intl');

  fReactIntl = true;
  try {
    var babelrc = JSON.parse(_fs2.default.readFileSync('.babelrc'));
    if (babelrc.presets) babelConfig.presets = babelConfig.presets.concat(babelrc.presets);
    if (babelrc.plugins) babelConfig.plugins = babelrc.plugins.concat(babelConfig.plugins);
  } catch (err) {
    _storyboard.mainStory.warn('parser', 'Could not find your .babelrc file; using default config for React Intl integration');
  }
} catch (err) {
  _storyboard.mainStory.warn('parser', 'Disabled React Intl integration');
  // eslint-disable-line max-len
  _storyboard.mainStory.warn('parser', 'If you need it, make sure you install babel-core and babel-plugin-react-intl');
}

// const REGEXP_TRANSLATE_CMDS = [
//   /_t\s*\(\s*"(.*?)"/g,
//   /_t\s*\(\s*'(.*?)'/g,
// ];

var getRegexps = function getRegexps(msgFunctionNames) {
  var out = [];
  msgFunctionNames.forEach(function (fnName) {
    var escapedFnName = fnName.replace(/([\$])/g, '\\$1');

    // Looking for something like:
    // * i18n("xk s fjkl")
    // * i18n ( "xk s fjkl")
    // * i18n('xk s fjkl')
    out.push(new RegExp(escapedFnName + '\\s*\\(\\s*"([\\s\\S]*?)"', 'gm'));
    out.push(new RegExp(escapedFnName + '\\s*\\(\\s*\'([\\s\\S]*?)\'', 'gm'));
  });
  return out;
};

function parse(_ref) {
  var srcPaths = _ref.srcPaths;
  var srcExtensions = _ref.srcExtensions;
  var msgFunctionNames = _ref.msgFunctionNames;
  var story = _ref.story;

  var regexpFunctionNames = getRegexps(msgFunctionNames);
  var keys = {};
  var diveOptions = { filter: function filter(filePath, fDir) {
      if (fDir) return true;
      return srcExtensions.indexOf(_path2.default.extname(filePath)) >= 0;
    } };
  var diveProcess = function diveProcess(err, filePath) {
    var finalFilePath = _path2.default.normalize(filePath);
    story.info('parser', 'Processing ' + _storyboard.chalk.cyan.bold(finalFilePath) + '...');
    var fileContents = _fs2.default.readFileSync(finalFilePath);
    regexpFunctionNames.forEach(function (re) {
      var match = void 0;
      while (match = re.exec(fileContents)) {
        addMessageToKeys(keys, match[1], finalFilePath);
      }
    });

    // React-intl strings
    if (fReactIntl) {
      try {
        var messages = babelCore.transform(fileContents, babelConfig).metadata['react-intl'].messages;

        if (messages) {
          messages.forEach(function (message) {
            var utf8 = message.defaultMessage;
            var description = message.description;
            var reactIntlId = message.id;

            addMessageToKeys(keys, utf8, finalFilePath, { reactIntlId: reactIntlId, description: description });
          });
        }
      } catch (err2) {
        story.error('parser', 'Error extracting React Intl messages', { attach: err2 });
      }
    }
  };
  srcPaths.forEach(function (srcPath) {
    return (0, _diveSync2.default)(srcPath, diveOptions, diveProcess);
  });
  return keys;
}

var addMessageToKeys = function addMessageToKeys(keys, utf8, filePath) {
  var extras = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  var tokens = utf8.split('_');
  var context = void 0;
  var text = void 0;
  if (tokens.length >= 2) {
    context = tokens.shift();
    text = tokens.join('_');
  } else {
    context = null;
    text = tokens[0];
  }
  var base64 = (0, _base.utf8ToBase64)(utf8);
  // eslint-disable-next-line no-param-reassign
  keys[base64] = keys[base64] || _extends({
    id: base64,
    context: context,
    text: text
  }, extras, {
    firstUsed: null,
    unusedSince: null,
    sources: []
  });
  keys[base64].sources.push((0, _slash2.default)(filePath));
};