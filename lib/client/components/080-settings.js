'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._Settings = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _timm = require('timm');

var _timm2 = _interopRequireDefault(_timm);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _lodash = require('lodash');

var _giu = require('giu');

var _translate = require('../../translate');

var _translate2 = _interopRequireDefault(_translate);

var _mutations = require('../gral/mutations');

var _helpers = require('./helpers');

var _constants = require('../gral/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ==========================================
// Relay fragments
// ==========================================
var fragments = {
  viewer: function viewer() {
    return function () {
      return {
        children: [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isRequisite: true
          },
          type: 'ID'
        }, {
          children: [{
            fieldName: 'langs',
            kind: 'Field',
            metadata: {
              isPlural: true
            },
            type: 'String'
          }, {
            fieldName: 'srcPaths',
            kind: 'Field',
            metadata: {
              isPlural: true
            },
            type: 'String'
          }, {
            fieldName: 'srcExtensions',
            kind: 'Field',
            metadata: {
              isPlural: true
            },
            type: 'String'
          }, {
            fieldName: 'msgFunctionNames',
            kind: 'Field',
            metadata: {
              isPlural: true
            },
            type: 'String'
          }, {
            fieldName: 'fMinify',
            kind: 'Field',
            metadata: {},
            type: 'Boolean'
          }, {
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }],
          fieldName: 'config',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            inferredRootCallName: 'node',
            inferredPrimaryKey: 'id'
          },
          type: 'Config'
        }],
        id: _reactRelay2.default.QL.__id(),
        kind: 'Fragment',
        metadata: {},
        name: 'UnknownFile_ViewerRelayQL',
        type: 'Viewer'
      };
    }();
  }
};

// ==========================================
// Component
// ==========================================

var Settings = function (_React$Component) {
  _inherits(Settings, _React$Component);

  function Settings(props) {
    _classCallCheck(this, Settings);

    // For arrays without IDs, it's better if we keep the current state at this level,
    // rather than relying on `giu`. For other attributes (`lang`, `fMinify`), we can
    // leave state handling entirely to `giu`, and fetch the value when the user clicks on
    // Save.
    var _this = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this, props));

    _this.state = (0, _lodash.pick)(props.viewer.config, ['langs', 'srcPaths', 'srcExtensions', 'msgFunctionNames']);
    (0, _giu.bindAll)(_this, ['onCreateListItem', 'onRemoveListItem', 'onUpdateListItem', 'onCancel', 'onSave']);
    return _this;
  }

  // ------------------------------------------


  _createClass(Settings, [{
    key: 'render',
    value: function render() {
      var buttons = [{ label: (0, _translate2.default)('button_Cancel'), onClick: this.onCancel, left: true }, { label: (0, _translate2.default)('button_Save'), onClick: this.onSave, defaultButton: true }];
      return _react2.default.createElement(
        _giu.Modal,
        {
          buttons: buttons,
          onEsc: this.onCancel,
          onClickBackdrop: this.onCancel
        },
        this.renderConfig()
      );
    }
  }, {
    key: 'renderConfig',
    value: function renderConfig() {
      var _this2 = this;

      var lang = this.props.lang;
      var fMinify = this.props.viewer.config.fMinify;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: style.configLine },
          _react2.default.createElement(
            'label',
            { htmlFor: 'lang' },
            (0, _translate2.default)('settingsForm_Mady language:')
          ),
          ' ',
          _react2.default.createElement(_giu.Select, { ref: function ref(c) {
              _this2.refLang = c;
            },
            value: lang,
            items: _constants.LANG_OPTIONS,
            required: true
          })
        ),
        _react2.default.createElement(
          'div',
          { style: style.listLabel },
          (0, _translate2.default)('settingsForm_Languages (BCP47 codes):')
        ),
        this.renderList({
          id: 'langs',
          dir: 'row',
          Component: _giu.TextInput,
          placeholder: 'e.g. es-ES, ca…',
          width: 80
        }),
        _react2.default.createElement(
          'div',
          { style: style.listLabel },
          (0, _translate2.default)('settingsForm_Source paths:')
        ),
        this.renderList({
          id: 'srcPaths',
          dir: 'column',
          Component: _giu.TextInput,
          placeholder: 'e.g. src/client',
          width: 300
        }),
        _react2.default.createElement(
          'div',
          { style: style.listLabel },
          (0, _translate2.default)('settingsForm_Source extensions:')
        ),
        this.renderList({
          id: 'srcExtensions',
          dir: 'row',
          Component: _giu.TextInput,
          placeholder: 'e.g. .js',
          width: 60
        }),
        _react2.default.createElement(
          'div',
          { style: style.listLabel },
          (0, _translate2.default)('settingsForm_Message translation functions to look for:')
        ),
        this.renderList({
          id: 'msgFunctionNames',
          dir: 'row',
          Component: _giu.TextInput,
          placeholder: 'e.g. _t',
          width: 60
        }),
        _react2.default.createElement(
          'div',
          { style: style.configLine },
          _react2.default.createElement(_giu.Checkbox, { ref: function ref(c) {
              _this2.refMinify = c;
            }, id: 'fMinify', value: fMinify }),
          _react2.default.createElement(
            'label',
            { htmlFor: 'fMinify' },
            (0, _translate2.default)('settingsForm_Minify output JavaScript')
          )
        )
      );
    }
  }, {
    key: 'renderList',
    value: function renderList(_ref) {
      var _this3 = this;

      var id = _ref.id;
      var dir = _ref.dir;
      var Component = _ref.Component;
      var placeholder = _ref.placeholder;
      var width = _ref.width;

      var values = this.state[id];
      return _react2.default.createElement(
        'div',
        { style: style.list(dir) },
        values.map(function (value, idx) {
          return _react2.default.createElement(
            'div',
            { key: idx, style: style.listItem(dir) },
            _react2.default.createElement(Component, {
              id: id + '.' + idx,
              value: value,
              placeholder: placeholder,
              onChange: _this3.onUpdateListItem,
              required: true, errorZ: 52,
              style: style.input(width)
            }),
            ' ',
            _react2.default.createElement(_giu.Icon, {
              id: id + '.' + idx,
              icon: 'remove',
              onClick: _this3.onRemoveListItem,
              style: style.remove
            })
          );
        }),
        _react2.default.createElement(_giu.Icon, {
          id: id,
          icon: 'plus',
          onClick: this.onCreateListItem,
          style: style.add
        })
      );
    }

    // ------------------------------------------

  }, {
    key: 'onCreateListItem',
    value: function onCreateListItem(ev) {
      var id = ev.currentTarget.id;

      var newList = _timm2.default.addLast(this.state[id], '');
      this.setState(_defineProperty({}, id, newList));
    }
  }, {
    key: 'onRemoveListItem',
    value: function onRemoveListItem(ev) {
      var _ev$currentTarget$id$ = ev.currentTarget.id.split('.');

      var _ev$currentTarget$id$2 = _slicedToArray(_ev$currentTarget$id$, 2);

      var id = _ev$currentTarget$id$2[0];
      var idx = _ev$currentTarget$id$2[1];

      var newList = _timm2.default.removeAt(this.state[id], Number(idx));
      this.setState(_defineProperty({}, id, newList));
    }
  }, {
    key: 'onUpdateListItem',
    value: function onUpdateListItem(ev) {
      var _ev$currentTarget$id$3 = ev.currentTarget.id.split('.');

      var _ev$currentTarget$id$4 = _slicedToArray(_ev$currentTarget$id$3, 2);

      var id = _ev$currentTarget$id$4[0];
      var idx = _ev$currentTarget$id$4[1];

      var value = ev.currentTarget.value;
      var newList = _timm2.default.replaceAt(this.state[id], idx, value);
      this.setState(_defineProperty({}, id, newList));
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      this.props.onClose();
    }
  }, {
    key: 'onSave',
    value: function onSave() {
      var _this4 = this;

      // Save lang
      var lang = this.refLang.getValue();
      if (lang !== this.props.lang) this.props.onChangeLang(lang);

      // Save other settings
      var viewer = this.props.viewer;

      var set = (0, _lodash.pick)(this.state, ['langs', 'srcPaths', 'srcExtensions', 'msgFunctionNames']);
      set.fMinify = this.refMinify.getValue();
      (0, _helpers.mutate)({
        description: 'Click on Save settings',
        Mutation: _mutations.UpdateConfigMutation,
        props: { viewerId: viewer.id, set: set, unset: [] },
        onSuccess: function onSuccess() {
          return _this4.props.onClose();
        },
        onFailure: function onFailure() {
          return (0, _giu.notify)({
            msg: (0, _translate2.default)('error_Configuration could not be saved'),
            type: 'error',
            icon: 'save'
          });
        }
      });
    }
  }]);

  return Settings;
}(_react2.default.Component);

// ==========================================
// Styles
// ==========================================


Settings.propTypes = {
  lang: _react2.default.PropTypes.string.isRequired,
  viewer: _react2.default.PropTypes.object.isRequired,
  onChangeLang: _react2.default.PropTypes.func.isRequired,
  onClose: _react2.default.PropTypes.func.isRequired
};
var style = {
  listLabel: {
    marginTop: 7,
    marginBottom: 3
  },
  list: function list(dir) {
    return (0, _giu.flexContainer)(dir, {
      marginLeft: 15
    });
  },
  listItem: function listItem(dir) {
    return {
      padding: '0px 2px',
      marginTop: dir === 'column' ? 1 : undefined,
      marginRight: 10,
      whiteSpace: 'nowrap'
    };
  },
  input: function input(width) {
    return { width: width };
  },
  add: {
    display: 'inline-block',
    marginTop: 5,
    color: '#444'
  },
  remove: { color: '#444' },
  configLine: {
    marginTop: 7
  }
};

// ==========================================
// Public API
// ==========================================
exports.default = _reactRelay2.default.createContainer(Settings, { fragments: fragments });
exports._Settings = Settings;