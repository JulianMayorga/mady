'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _giu = require('giu');

var _translate = require('../../translate');

var _translate2 = _interopRequireDefault(_translate);

var _header = require('./050-header');

var _header2 = _interopRequireDefault(_header);

var _translator = require('./060-translator');

var _translator2 = _interopRequireDefault(_translator);

var _details = require('./070-details');

var _details2 = _interopRequireDefault(_details);

var _settings = require('./080-settings');

var _settings2 = _interopRequireDefault(_settings);

var _storage = require('../gral/storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


require('./010-app.sass');

// Example MessageFormat message with plural, so that it appears in the screenshot:
// _t("someContext_{NUM, plural, one{1 hamburger} other{# hamburgers}}", { NUM: 1 })
// Example message with emoji, so that it appears in the screenshot:
// _t("someContext_Message with emoji: 🎉")
// Example message with American and British English versions, so that it appears in the screenshot:
// _t("someContext_A tool for internationalization")

// ==========================================
// Relay fragments
// ==========================================
var fragments = {
  viewer: function viewer() {
    return function (RQL_0, RQL_1, RQL_2) {
      return {
        children: [].concat.apply([], [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }, _reactRelay2.default.QL.__frag(RQL_0), _reactRelay2.default.QL.__frag(RQL_1), _reactRelay2.default.QL.__frag(RQL_2)]),
        id: _reactRelay2.default.QL.__id(),
        kind: 'Fragment',
        metadata: {},
        name: 'UnknownFile_ViewerRelayQL',
        type: 'Viewer'
      };
    }(_translator2.default.getFragment('viewer'), _settings2.default.getFragment('viewer'), _details2.default.getFragment('viewer'));
  }
};

// ==========================================
// Component
// ==========================================

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      selectedKeyId: null,
      fSettingsShown: false,
      lang: (0, _storage.cookieGet)('lang', { defaultValue: 'en' })
    };
    (0, _giu.bindAll)(_this, ['changeSelectedKey', 'showSettings', 'hideSettings', 'onChangeLang']);
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.showHint();
    }

    // ------------------------------------------

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: style.outer },
        _react2.default.createElement(_giu.Floats, null),
        _react2.default.createElement(_giu.Notifications, null),
        _react2.default.createElement(_giu.Hints, null),
        _react2.default.createElement(_header2.default, { onShowSettings: this.showSettings }),
        _react2.default.createElement(_translator2.default, {
          lang: this.state.lang,
          viewer: this.props.viewer,
          selectedKeyId: this.state.selectedKeyId,
          changeSelectedKey: this.changeSelectedKey
        }),
        _react2.default.createElement(_details2.default, {
          lang: this.state.lang,
          viewer: this.props.viewer,
          selectedKeyId: this.state.selectedKeyId
        }),
        this.state.fSettingsShown && _react2.default.createElement(_settings2.default, {
          lang: this.state.lang,
          viewer: this.props.viewer,
          onChangeLang: this.onChangeLang,
          onClose: this.hideSettings
        })
      );
    }

    // ------------------------------------------

  }, {
    key: 'changeSelectedKey',
    value: function changeSelectedKey(selectedKeyId) {
      this.setState({ selectedKeyId: selectedKeyId });
    }
  }, {
    key: 'showSettings',
    value: function showSettings() {
      this.setState({ fSettingsShown: true });
    }
  }, {
    key: 'hideSettings',
    value: function hideSettings() {
      this.setState({ fSettingsShown: false });
    }
  }, {
    key: 'onChangeLang',
    value: function onChangeLang(lang) {
      var _this2 = this;

      (0, _storage.cookieSet)('lang', lang);
      /* eslint-disable global-require */
      require('bundle!../../locales/' + lang + '.js')(function (locales) {
        _translate2.default.setLocales(locales);
        _moment2.default.locale(lang);
        _this2.setState({ lang: lang });
      });
      /* eslint-enable global-require */
    }

    // ------------------------------------------

  }, {
    key: 'showHint',
    value: function showHint(fForce) {
      var elements = function elements() {
        var out = [];
        var nodeSettings = document.getElementById('madyBtnSettings');
        if (nodeSettings) {
          var bcr = nodeSettings.getBoundingClientRect();
          var x = window.innerWidth / 2;
          out.push({
            type: 'LABEL', x: x, y: 70, align: 'center',
            children: (0, _translate2.default)('hint_Configure Mady')
          });
          out.push({
            type: 'ARROW', from: { x: x, y: 70 },
            to: { x: bcr.left - 5, y: (bcr.top + bcr.bottom) / 2 }
          });
        }
        var nodeAddLang = document.getElementById('madyBtnAddLang');
        if (nodeAddLang) {
          var _bcr = nodeAddLang.getBoundingClientRect();
          var _x = window.innerWidth - 50;
          out.push({
            type: 'LABEL', x: _x, y: 140, align: 'right',
            children: (0, _translate2.default)('hint_Add language column')
          });
          out.push({
            type: 'ARROW', from: { x: _x, y: 140 },
            to: { x: (_bcr.left + _bcr.right) / 2, y: _bcr.bottom },
            counterclockwise: true
          });
        }
        return out;
      };
      var closeLabel = (0, _translate2.default)('hint_Enjoy translating!');
      (0, _giu.hintDefine)('main', { elements: elements, closeLabel: closeLabel });
      (0, _giu.hintShow)('main', fForce);
    }
  }]);

  return App;
}(_react2.default.Component);

// ==========================================
// Styles
// ==========================================


App.propTypes = {
  viewer: _react2.default.PropTypes.object.isRequired
};
var style = {
  outer: {
    minHeight: '100%',
    padding: '0px 10px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white'
  }
};

// ==========================================
// Public API
// ==========================================
exports.default = _reactRelay2.default.createContainer(App, { fragments: fragments });