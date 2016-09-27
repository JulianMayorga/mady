'use strict';

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _storyboard = require('storyboard');

var _console = require('storyboard/lib/listeners/console');

var _console2 = _interopRequireDefault(_console);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _gqlServer = require('./gqlServer');

var gqlServer = _interopRequireWildcard(_gqlServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storyboard.addListener)(_console2.default);

var outputPath = _path2.default.join(__dirname, '../common/');
gqlServer.init();

_bluebird2.default.resolve().then(function () {
  _storyboard.mainStory.info('gqlUpdate', 'Introspecting...');
  return gqlServer.runIntrospect();
}).then(function (result) {
  var filePath = _path2.default.join(outputPath, 'gqlSchema.json');
  _storyboard.mainStory.info('gqlUpdate', 'Writing ' + _storyboard.chalk.cyan(filePath) + '...');
  _fsExtra2.default.writeFileSync(filePath, JSON.stringify(result, null, 2));
  filePath = _path2.default.join(outputPath, 'gqlSchema.graphql');
  _storyboard.mainStory.info('gqlUpdate', 'Writing ' + _storyboard.chalk.cyan(filePath) + '...');
  _fsExtra2.default.writeFileSync(filePath, gqlServer.getSchemaShorthand());
  _storyboard.mainStory.info('gqlUpdate', 'Done!');
});