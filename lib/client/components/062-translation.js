'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._HoverableTranslation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _messageformat = require('messageformat');

var _messageformat2 = _interopRequireDefault(_messageformat);

var _storyboard = require('storyboard');

var _giu = require('giu');

var _translate = require('../../translate');

var _translate2 = _interopRequireDefault(_translate);

var _mutations = require('../gral/mutations');

var _constants = require('../gral/constants');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validateTranslation = function validateTranslation(lang) {
  return function (val) {
    var numOpen = val.split('{').length - 1;
    var numClose = val.split('}').length - 1;
    if (numOpen !== numClose) {
      return (0, _translate2.default)('validation_the number of left and right brackets does not match');
    }
    var mf = new _messageformat2.default(lang);
    try {
      mf.compile(val);
    } catch (err) {
      var msg = (0, _translate2.default)('validation_MessageFormat syntax error');
      return msg + ': ' + err.message;
    }
    return undefined;
  };
};

// ==========================================
// Relay fragments
// ==========================================
var fragments = {
  theKey: function theKey() {
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
          fieldName: 'text',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }],
        id: _reactRelay2.default.QL.__id(),
        kind: 'Fragment',
        metadata: {},
        name: 'UnknownFile_TheKeyRelayQL',
        type: 'Key'
      };
    }();
  },
  translation: function translation() {
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
          fieldName: 'lang',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          fieldName: 'translation',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }],
        id: _reactRelay2.default.QL.__id(),
        kind: 'Fragment',
        metadata: {},
        name: 'UnknownFile_TranslationRelayQL',
        type: 'Translation'
      };
    }();
  }
};

// ==========================================
// Component
// ==========================================

var Translation = function (_React$Component) {
  _inherits(Translation, _React$Component);

  function Translation(props) {
    _classCallCheck(this, Translation);

    var _this = _possibleConstructorReturn(this, (Translation.__proto__ || Object.getPrototypeOf(Translation)).call(this, props));

    _this.state = {
      fEditing: false,
      cmds: []
    };
    (0, _giu.bindAll)(_this, ['onFocus', 'onBlur', 'onKeyDown', 'onKeyUp', 'onMouseDownCopyKey', 'onClickDelete']);
    return _this;
  }

  // ==========================================
  // Render
  // ==========================================


  _createClass(Translation, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          onMouseEnter: this.props.onHoverStart,
          onMouseLeave: this.props.onHoverStop,
          style: style.outer
        },
        this.renderTranslation(),
        this.renderButtons(),
        this.renderHelp()
      );
    }
  }, {
    key: 'renderTranslation',
    value: function renderTranslation() {
      var _this2 = this;

      var _props = this.props;
      var lang = _props.lang;
      var translation = _props.translation;
      var cmds = this.state.cmds;
      // const fUpdating = translation && relay.hasOptimisticUpdate(translation);

      return _react2.default.createElement(_giu.Textarea, { ref: function ref(c) {
          _this2.refInput = c;
        },
        value: translation ? translation.translation : null,
        validators: [validateTranslation(lang)],
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        cmds: cmds,
        style: style.textareaBase(this.state)
      });
    }
  }, {
    key: 'renderButtons',
    value: function renderButtons() {
      if (!this.state.fEditing && !this.props.hovering) return null;
      var translation = this.props.translation;

      var elDelete = translation ? _react2.default.createElement(_giu.Icon, {
        icon: 'remove',
        title: (0, _translate2.default)('tooltip_Delete translation'),
        onClick: this.onClickDelete,
        style: style.iconButton
      }) : null;
      return _react2.default.createElement(
        'div',
        { style: style.buttons },
        _react2.default.createElement(_giu.Icon, {
          icon: 'copy',
          title: (0, _translate2.default)('tooltip_Copy message'),
          onMouseDown: this.onMouseDownCopyKey,
          style: style.iconButton
        }),
        elDelete
      );
    }
  }, {
    key: 'renderHelp',
    value: function renderHelp() {
      if (!this.state.fEditing) return null;
      return _react2.default.createElement(
        'div',
        { style: style.help },
        (0, _translate2.default)('translationHelp_Click outside or TAB to save. ESC to undo.')
      );
    }

    // ==========================================
    // Handlers
    // ==========================================

  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({ fEditing: true });
      this.props.changeSelectedKey(this.props.theKey.id);
    }

    // RETURN + modifier key (unmodified RETURNs are accepted in the textarea): ignore (will
    // be processed on keyup)

  }, {
    key: 'onKeyDown',
    value: function onKeyDown(ev) {
      if (ev.which === _giu.KEYS.enter && (ev.ctrlKey || ev.altKey || ev.metaKey || ev.shiftKey)) {
        (0, _giu.cancelEvent)(ev);
      }
    }

    // ESC: revert and blur
    // RETURN + modifier key (unmodified RETURNs are accepted in the textarea): blur (and save)

  }, {
    key: 'onKeyUp',
    value: function onKeyUp(ev) {
      if (ev.which === _giu.KEYS.esc) {
        this.setState({ cmds: [{ type: 'REVERT' }, { type: 'BLUR' }] });
      } else if (ev.which === _giu.KEYS.enter && (ev.ctrlKey || ev.altKey || ev.metaKey || ev.shiftKey)) {
        this.setState({ cmds: [{ type: 'BLUR' }] });
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var _this3 = this;

      this.setState({ fEditing: false });
      if (!this.refInput) {
        _storyboard.mainStory.warn('translation', 'Could not save translation');
        return;
      }
      this.refInput.validateAndGetValue().then(function (text) {
        if (text === _this3.getInitialTranslation()) return;
        var description = 'Commit translation edit';
        var Mutation = void 0;
        var props = void 0;
        if (_this3.props.translation) {
          Mutation = _mutations.UpdateTranslationMutation;
          props = {
            id: _this3.props.translation.id,
            set: {
              translation: text
            }
          };
        } else {
          Mutation = _mutations.CreateTranslationMutation;
          props = {
            set: {
              lang: _this3.props.lang,
              keyId: _this3.props.theKey.id,
              translation: text
            },
            keyId: _this3.props.theKey.id
          };
        }
        (0, _helpers.mutate)({ description: description, Mutation: Mutation, props: props });
      });
    }
  }, {
    key: 'onMouseDownCopyKey',
    value: function onMouseDownCopyKey() {
      this.setState({
        cmds: [{ type: 'SET_VALUE', value: this.props.theKey.text }, { type: 'FOCUS' }]
      });
    }
  }, {
    key: 'onClickDelete',
    value: function onClickDelete() {
      (0, _helpers.mutate)({
        description: 'Click on Delete translation',
        Mutation: _mutations.DeleteTranslationMutation,
        props: {
          id: this.props.translation.id,
          keyId: this.props.theKey.id
        }
      });
    }

    // ==========================================
    // Helpers
    // ==========================================

  }, {
    key: 'getInitialTranslation',
    value: function getInitialTranslation() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

      return props.translation ? props.translation.translation : null;
    }
  }]);

  return Translation;
}(_react2.default.Component);

// ==========================================
// Styles
// ==========================================


Translation.propTypes = {
  // relay:                  React.PropTypes.object.isRequired,
  theKey: _react2.default.PropTypes.object.isRequired,
  lang: _react2.default.PropTypes.string.isRequired,
  translation: _react2.default.PropTypes.object,
  changeSelectedKey: _react2.default.PropTypes.func.isRequired,
  // fUnused:                React.PropTypes.bool.isRequired,
  // From hoverable
  hovering: _react2.default.PropTypes.bool,
  onHoverStart: _react2.default.PropTypes.func.isRequired,
  onHoverStop: _react2.default.PropTypes.func.isRequired
};
var style = {
  outer: {
    paddingRight: 40,
    marginBottom: -2
  },
  textareaBase: function textareaBase(_ref) {
    var fEditing = _ref.fEditing;
    return {
      padding: 0,
      border: '1px solid transparent',
      backgroundColor: fEditing ? undefined : 'transparent',
      minHeight: 17
    };
  },
  buttons: {
    position: 'absolute',
    top: 1,
    right: 5,
    color: 'black'
  },
  iconButton: {
    marginLeft: 5
  },
  help: {
    marginTop: 1,
    marginBottom: 2,
    fontStyle: 'italic',
    color: _constants.COLORS.dim
  }
};

// ==========================================
// Public API
// ==========================================
var HoverableTranslation = (0, _giu.hoverable)(Translation);
exports.default = _reactRelay2.default.createContainer(HoverableTranslation, { fragments: fragments });
exports._HoverableTranslation = HoverableTranslation;