'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _timm = require('timm');

var _timm2 = _interopRequireDefault(_timm);

var _storyboard = require('storyboard');

var _console = require('storyboard/lib/listeners/console');

var _console2 = _interopRequireDefault(_console);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _opn = require('opn');

var _opn2 = _interopRequireDefault(_opn);

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _gqlServer = require('./gqlServer');

var gqlServer = _interopRequireWildcard(_gqlServer);

var _httpServer = require('./httpServer');

var httpServer = _interopRequireWildcard(_httpServer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkg = require('../../package.json');

_bluebird2.default.longStackTraces();

var _launchPars = null;

var DEFAULT_LOCALE_PATH = 'locales';
var DEFAULT_PORT = 8080;

(0, _storyboard.addListener)(_console2.default);
process.on('SIGINT', function () {
  _storyboard.mainStory.debug('startup', 'CTRL-C received');
  process.exit(0);
});

// ==============================================
// Main
// ==============================================
_commander2.default.version(pkg.version).option('-d, --dir [dir]', 'Relative path to locale folder').option('-p, --port [port]', 'Initial port number to use ' + '(if unavailable, the next available one will be used)').option('--recompile', 'Recompile translations upon launch').option('--importV0 [dir]', 'Import a "v0" (old) locale folder').parse(process.argv);

_bluebird2.default.resolve().then(function () {
  return _readLaunchPars();
}).then(function () {
  _storyboard.mainStory.info('startup', 'Launch parameters:', { attach: _launchPars });
  db.init({ localeDir: _launchPars.localeDir, fRecompile: _commander2.default.recompile });
}).then(function () {
  if (_commander2.default.importV0) {
    db.importV0(_commander2.default.importV0);
  } else {
    gqlServer.init();
    httpServer.init({ port: _launchPars.port });
  }
  (0, _opn2.default)('http://localhost:' + _launchPars.port + '/');
});

// ==============================================
// Helpers
// ==============================================
function _readLaunchPars() {
  var launchParsPath = _path2.default.join(process.cwd(), '.madyrc');
  var launchPars = {};
  var fModified = false;

  // Config provided by `.madyrc` file
  try {
    launchPars = JSON.parse(_fsExtra2.default.readFileSync(launchParsPath));
  } catch (err) {} /* Ignore exception */

  // Config updated by CLI arguments
  var launchPars2 = _timm2.default.merge(launchPars, {
    localeDir: _commander2.default.dir,
    port: _commander2.default.port
  });
  if (launchPars2 !== launchPars) {
    fModified = true;
    launchPars = launchPars2;
  }

  // Config complemented by questions to the user
  var questions = [{
    name: 'localeDir',
    message: 'Please specify a folder for your locales and config',
    default: DEFAULT_LOCALE_PATH,
    when: function when() {
      return launchPars.localeDir == null;
    }
  }, {
    name: 'port',
    message: 'Please specify an initial port',
    default: DEFAULT_PORT,
    when: function when() {
      return launchPars.port == null;
    }
  }];
  return _inquirer2.default.prompt(questions).then(function (answers) {
    fModified = fModified || !!Object.keys(answers).length;
    _launchPars = _timm2.default.merge(launchPars, answers);
    if (fModified) db.saveJson(launchParsPath, _launchPars);
  });
}