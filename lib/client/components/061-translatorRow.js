'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._HoverableTranslatorRow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _timm = require('timm');

var _timm2 = _interopRequireDefault(_timm);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _giu = require('giu');

var _translate = require('../../translate');

var _translate2 = _interopRequireDefault(_translate);

var _constants = require('../gral/constants');

var _mutations = require('../gral/mutations');

var _helpers = require('./helpers');

var _translation = require('./062-translation');

var _translation2 = _interopRequireDefault(_translation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ------------------------------------------
// Relay fragments
// ------------------------------------------
var fragments = {
  theKey: function theKey() {
    return function (RQL_0, RQL_1) {
      return {
        children: [].concat.apply([], [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isRequisite: true
          },
          type: 'ID'
        }, {
          fieldName: 'context',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          fieldName: 'text',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          fieldName: 'unusedSince',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'first',
            value: {
              kind: 'CallValue',
              callValue: 100000
            }
          }],
          children: [{
            children: [{
              children: [].concat.apply([], [{
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
              }, _reactRelay2.default.QL.__frag(RQL_1)]),
              fieldName: 'node',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id',
                isRequisite: true
              },
              type: 'Translation'
            }, {
              fieldName: 'cursor',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'String'
            }],
            fieldName: 'edges',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'TranslationEdge'
          }, {
            children: [{
              fieldName: 'hasNextPage',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'Boolean'
            }, {
              fieldName: 'hasPreviousPage',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'Boolean'
            }],
            fieldName: 'pageInfo',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isGenerated: true,
              isRequisite: true
            },
            type: 'PageInfo'
          }],
          fieldName: 'translations',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            isConnection: true
          },
          type: 'TranslationConnection'
        }, _reactRelay2.default.QL.__frag(RQL_0)]),
        id: _reactRelay2.default.QL.__id(),
        kind: 'Fragment',
        metadata: {},
        name: 'UnknownFile_TheKeyRelayQL',
        type: 'Key'
      };
    }(_translation2.default.getFragment('theKey'), _translation2.default.getFragment('translation'));
  },
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

// ------------------------------------------
// Component
// ------------------------------------------

var TranslatorRow = function (_React$PureComponent) {
  _inherits(TranslatorRow, _React$PureComponent);

  function TranslatorRow(props) {
    _classCallCheck(this, TranslatorRow);

    var _this = _possibleConstructorReturn(this, (TranslatorRow.__proto__ || Object.getPrototypeOf(TranslatorRow)).call(this, props));

    (0, _giu.bindAll)(_this, ['renderTranslation', 'onClickKeyRow', 'onClickDeleteKey']);
    return _this;
  }

  // ------------------------------------------
  // Render
  // ------------------------------------------


  _createClass(TranslatorRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var key = _props.theKey;
      var fSelected = _props.fSelected;
      var styleKeyCol = _props.styleKeyCol;
      var hovering = _props.hovering;
      var onHoverStart = _props.onHoverStart;
      var onHoverStop = _props.onHoverStop;

      var fUnused = !!key.unusedSince;
      var elContext = key.context ? _react2.default.createElement(
        'span',
        { style: style.context },
        key.context
      ) : undefined;
      var elText = _react2.default.createElement(
        'span',
        { style: style.text },
        key.text
      );
      var elDeleteKey = hovering ? _react2.default.createElement(_giu.Icon, {
        icon: 'remove',
        title: (0, _translate2.default)('tooltip_Delete message (does NOT delete any translations)'),
        onClick: this.onClickDeleteKey,
        style: style.removeIcon
      }) : undefined;
      var cellStyle = _timm2.default.merge(style.bodyCell, styleKeyCol, style.keyCell);
      if (fSelected) cellStyle = style.selected(cellStyle);
      if (fUnused) cellStyle = style.unused(cellStyle);
      return _react2.default.createElement(
        'div',
        {
          className: 'tableBodyRow',
          id: key.id,
          onClick: this.onClickKeyRow,
          style: style.row
        },
        _react2.default.createElement(
          'div',
          {
            onMouseEnter: onHoverStart,
            onMouseLeave: onHoverStop,
            style: cellStyle
          },
          elContext,
          elText,
          elDeleteKey
        ),
        this.props.langs.map(this.renderTranslation)
      );
    }
  }, {
    key: 'renderTranslation',
    value: function renderTranslation(lang) {
      var _props2 = this.props;
      var key = _props2.theKey;
      var fSelected = _props2.fSelected;
      var styleLangCol = _props2.styleLangCol;

      var edge = key.translations.edges.find(function (_ref) {
        var node = _ref.node;
        return node.lang === lang;
      });
      var translation = edge ? edge.node : null;
      var fUnused = !!key.unusedSince;
      var cellStyle = _timm2.default.merge(style.bodyCell, styleLangCol);
      if (!edge && !fUnused) cellStyle = style.untranslated(cellStyle);
      if (fSelected) cellStyle = style.selected(cellStyle);
      return _react2.default.createElement(
        'div',
        { key: lang, style: cellStyle },
        _react2.default.createElement(_translation2.default, {
          theKey: key,
          lang: lang,
          translation: translation,
          changeSelectedKey: this.props.changeSelectedKey
        })
      );
    }

    // ------------------------------------------
    // Handlers
    // ------------------------------------------

  }, {
    key: 'onClickKeyRow',
    value: function onClickKeyRow() {
      this.props.changeSelectedKey(this.props.theKey.id);
    }
  }, {
    key: 'onClickDeleteKey',
    value: function onClickDeleteKey(ev) {
      var _props3 = this.props;
      var viewer = _props3.viewer;
      var theKey = _props3.theKey;
      var fSelected = _props3.fSelected;
      var changeSelectedKey = _props3.changeSelectedKey;

      (0, _giu.cancelEvent)(ev);
      if (fSelected) changeSelectedKey(null);
      (0, _helpers.mutate)({
        description: 'Click on Delete key',
        Mutation: _mutations.DeleteKeyMutation,
        props: { viewerId: viewer.id, id: theKey.id }
      });
    }
  }]);

  return TranslatorRow;
}(_react2.default.PureComponent);

// ------------------------------------------
// Styles
// ------------------------------------------


TranslatorRow.propTypes = {
  theKey: _react2.default.PropTypes.object.isRequired,
  viewer: _react2.default.PropTypes.object.isRequired,
  langs: _react2.default.PropTypes.array.isRequired,
  fSelected: _react2.default.PropTypes.bool.isRequired,
  changeSelectedKey: _react2.default.PropTypes.func.isRequired,
  styleKeyCol: _react2.default.PropTypes.object.isRequired,
  styleLangCol: _react2.default.PropTypes.object.isRequired,
  // From hoverable
  hovering: _react2.default.PropTypes.bool,
  onHoverStart: _react2.default.PropTypes.func.isRequired,
  onHoverStop: _react2.default.PropTypes.func.isRequired
};
var style = {
  row: (0, _giu.flexItem)('none', (0, _giu.flexContainer)('row', {
    minHeight: 21
  })),
  bodyCell: {
    position: 'relative',
    paddingTop: 1,
    paddingBottom: 1,
    borderBottom: '1px solid ' + _constants.COLORS.dark
  },
  keyCell: {
    paddingRight: 17
  },
  selected: function selected(base) {
    return _timm2.default.merge(base, {
      backgroundColor: _constants.COLORS.medium
    });
  },
  unused: function unused(base) {
    return _timm2.default.merge(base, {
      color: _constants.COLORS.dim
    });
  },
  untranslated: function untranslated(base) {
    return _timm2.default.merge(base, {
      backgroundColor: _constants.COLORS.mediumAlt
    });
  },
  context: {
    fontWeight: 900,
    marginRight: 10
  },
  text: {
    whiteSpace: 'pre-wrap'
  },
  removeIcon: {
    position: 'absolute',
    top: 3,
    right: 5,
    color: 'black'
  }
};

// ==========================================
// Public API
// ==========================================
var HoverableTranslatorRow = (0, _giu.hoverable)(TranslatorRow);
exports.default = _reactRelay2.default.createContainer(HoverableTranslatorRow, { fragments: fragments });
exports._HoverableTranslatorRow = HoverableTranslatorRow;