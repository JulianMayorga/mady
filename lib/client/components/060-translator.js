'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _constants = require('../gral/constants');

var _storage = require('../gral/storage');

var _helpers = require('./helpers');

var _translatorRow = require('./061-translatorRow');

var _translatorRow2 = _interopRequireDefault(_translatorRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-env browser */


// ==========================================
// Translator
// ==========================================
var comparator = function comparator(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
};
var keyComparator = function keyComparator(a, b) {
  var aStr = '' + (a.context || '') + a.text + a.id;
  var bStr = '' + (b.context || '') + b.text + b.id;
  return comparator(aStr, bStr);
};

// ------------------------------------------
// Relay fragments
// ------------------------------------------
var fragments = {
  viewer: function viewer() {
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
          children: [{
            fieldName: 'langs',
            kind: 'Field',
            metadata: {
              isPlural: true
            },
            type: 'String'
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
                fieldName: 'unusedSince',
                kind: 'Field',
                metadata: {},
                type: 'String'
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
                    children: [{
                      fieldName: 'lang',
                      kind: 'Field',
                      metadata: {},
                      type: 'String'
                    }, {
                      fieldName: 'id',
                      kind: 'Field',
                      metadata: {
                        isGenerated: true,
                        isRequisite: true
                      },
                      type: 'ID'
                    }],
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
              fieldName: 'node',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id',
                isRequisite: true
              },
              type: 'Key'
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
            type: 'KeyEdge'
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
          fieldName: 'keys',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            isConnection: true
          },
          type: 'KeyConnection'
        }, _reactRelay2.default.QL.__frag(RQL_1)]),
        id: _reactRelay2.default.QL.__id(),
        kind: 'Fragment',
        metadata: {},
        name: 'UnknownFile_ViewerRelayQL',
        type: 'Viewer'
      };
    }(_translatorRow2.default.getFragment('theKey'), _translatorRow2.default.getFragment('viewer'));
  }
};

// ------------------------------------------
// Component
// ------------------------------------------

var Translator = function (_React$PureComponent) {
  _inherits(Translator, _React$PureComponent);

  function Translator(props) {
    _classCallCheck(this, Translator);

    var _this = _possibleConstructorReturn(this, (Translator.__proto__ || Object.getPrototypeOf(Translator)).call(this, props));

    _this.state = {
      langs: _this.readLangs(),
      fParsing: false
    };
    (0, _giu.bindAll)(_this, ['renderKeyRow', 'onAddLang', 'onRemoveLang', 'onChangeLang', 'onParseSrcFiles']);
    _this.forceRender = (0, _lodash.throttle)(_this.forceRender.bind(_this), 200);
    return _this;
  }

  _createClass(Translator, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.forceRender);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.forceRender);
    }
  }, {
    key: 'forceRender',
    value: function forceRender() {
      this.forceUpdate();
    }

    // ------------------------------------------
    // Render
    // ------------------------------------------

  }, {
    key: 'render',
    value: function render() {
      this.calcStats();
      return _react2.default.createElement(
        'div',
        { style: style.outer },
        this.renderHeader(),
        this.renderBody()
      );
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      var _this2 = this;

      var _props$viewer = this.props.viewer;
      var keys = _props$viewer.keys;
      var config = _props$viewer.config;

      var langOptions = config.langs.map(function (lang) {
        return { value: lang, label: lang };
      });
      return _react2.default.createElement(
        'div',
        {
          className: 'tableHeaderRow',
          style: _timm2.default.merge(style.row, style.headerRow)
        },
        _react2.default.createElement(
          'div',
          { style: _timm2.default.merge(style.headerCell, style.keyCol) },
          (0, _translate2.default)('columnTitle_Messages').toUpperCase(),
          ' ',
          _react2.default.createElement(
            'span',
            { style: style.numItems },
            '[',
            _react2.default.createElement(
              'span',
              { title: (0, _translate2.default)('tooltip_Used messages') },
              this.stats.numUsedKeys
            ),
            ' / ',
            _react2.default.createElement(
              'span',
              { title: (0, _translate2.default)('tooltip_Total messages') },
              keys.edges.length
            ),
            ']'
          ),
          ' ',
          _react2.default.createElement(_giu.Icon, {
            icon: 'refresh',
            title: (0, _translate2.default)('tooltip_Parse source files to update the message list'),
            onClick: this.onParseSrcFiles,
            spin: this.state.fParsing
          })
        ),
        this.state.langs.map(function (lang, idx) {
          return _this2.renderLangHeader(lang, idx, langOptions);
        }),
        this.renderAdd(),
        _react2.default.createElement('div', { style: style.scrollbarSpacer() })
      );
    }
  }, {
    key: 'renderLangHeader',
    value: function renderLangHeader(lang, idx, langOptions) {
      return _react2.default.createElement(
        'div',
        { key: lang,
          style: _timm2.default.merge(style.headerCell, style.langCol)
        },
        _react2.default.createElement(
          'div',
          {
            title: (0, _translate2.default)('tooltip_Change language'),
            style: style.langSelectorOuter
          },
          _react2.default.createElement(_giu.Icon, { icon: 'caret-down', style: style.langSelectorCaret }),
          lang,
          _react2.default.createElement(_giu.Select, {
            id: idx,
            value: lang,
            onChange: this.onChangeLang,
            required: true,
            items: langOptions,
            style: style.langSelector
          })
        ),
        ' ',
        _react2.default.createElement(
          'span',
          { style: style.numItems },
          '[',
          _react2.default.createElement(
            'span',
            { title: (0, _translate2.default)('tooltip_Translations') },
            this.stats.numTranslations[lang] || 0
          ),
          ' / ',
          _react2.default.createElement(
            'span',
            { title: (0, _translate2.default)('tooltip_Used messages') },
            this.stats.numUsedKeys
          ),
          ']'
        ),
        ' ',
        _react2.default.createElement(_giu.Icon, {
          id: idx,
          icon: 'remove',
          title: (0, _translate2.default)('tooltip_Remove column (does NOT delete any translations)'),
          onClick: this.onRemoveLang
        })
      );
    }
  }, {
    key: 'renderBody',
    value: function renderBody() {
      var keys = this.props.viewer.keys.edges.map(function (o) {
        return o.node;
      });
      keys = keys.sort(keyComparator);
      return _react2.default.createElement(
        'div',
        {
          className: 'tableBody',
          style: style.body
        },
        keys.map(this.renderKeyRow),
        this.renderFillerRow()
      );
    }
  }, {
    key: 'renderKeyRow',
    value: function renderKeyRow(key) {
      var fSelected = this.props.selectedKeyId === key.id;
      return _react2.default.createElement(_translatorRow2.default, { key: key.id,
        theKey: key,
        viewer: this.props.viewer,
        langs: this.state.langs,
        fSelected: fSelected,
        changeSelectedKey: this.props.changeSelectedKey,
        styleKeyCol: style.keyCol,
        styleLangCol: style.langCol
      });
    }
  }, {
    key: 'renderFillerRow',
    value: function renderFillerRow() {
      var noKeys = this.props.viewer.keys.edges.length > 0 ? '' : _react2.default.createElement(
        _giu.LargeMessage,
        null,
        'No messages. Click on ',
        _react2.default.createElement(_giu.Icon, { icon: 'refresh', disabled: true }),
        ' to refresh'
      );
      return _react2.default.createElement(
        'div',
        {
          className: 'tableFillerRow',
          style: style.fillerRow
        },
        _react2.default.createElement(
          'div',
          { style: style.keyCol },
          noKeys
        ),
        this.state.langs.map(function (lang) {
          return _react2.default.createElement('div', { key: lang, style: style.langCol });
        })
      );
    }
  }, {
    key: 'renderAdd',
    value: function renderAdd() {
      var fDisabled = this.state.langs.length === this.props.viewer.config.langs.length;
      return _react2.default.createElement(
        'div',
        {
          id: 'madyBtnAddLang',
          onClick: fDisabled ? undefined : this.onAddLang,
          title: (0, _translate2.default)('tooltip_Add column'),
          style: style.addLang(fDisabled)
        },
        _react2.default.createElement(_giu.Icon, { icon: 'plus', disabled: fDisabled })
      );
    }

    // ------------------------------------------
    // Langs
    // ------------------------------------------

  }, {
    key: 'readLangs',
    value: function readLangs() {
      var availableLangs = this.props.viewer.config.langs;
      var langs = (0, _storage.cookieGet)('langs') || [];
      langs = (0, _lodash.filter)(langs, function (o) {
        return availableLangs.indexOf(o) >= 0;
      });
      if (!langs.length && availableLangs.length) langs.push(availableLangs[0]);
      this.writeLangs(langs);
      return langs;
    }
  }, {
    key: 'writeLangs',
    value: function writeLangs(langs) {
      (0, _storage.cookieSet)('langs', langs);
    }
  }, {
    key: 'onAddLang',
    value: function onAddLang() {
      var prevLangs = this.state.langs;
      var availableLangs = this.props.viewer.config.langs;
      var newLang = availableLangs.find(function (o) {
        return prevLangs.indexOf(o) < 0;
      });
      if (newLang == null) return;
      var nextLangs = _timm2.default.addLast(prevLangs, newLang);
      this.updateLangs(nextLangs);
    }
  }, {
    key: 'onRemoveLang',
    value: function onRemoveLang(ev) {
      this.removeLang(Number(ev.currentTarget.id));
    }
  }, {
    key: 'removeLang',
    value: function removeLang(idx) {
      var nextLangs = _timm2.default.removeAt(this.state.langs, idx);
      this.updateLangs(nextLangs);
    }
  }, {
    key: 'onChangeLang',
    value: function onChangeLang(ev, lang) {
      var prevLangs = this.state.langs;
      var idx = Number(ev.currentTarget.id);
      var fFound = false;
      for (var i = 0; i < prevLangs.length; i++) {
        if (i === idx) continue;
        if (prevLangs[i] === lang) {
          fFound = true;
          break;
        }
      }
      if (fFound) {
        this.removeLang(idx);
        return;
      }
      var nextLangs = _timm2.default.replaceAt(this.state.langs, idx, lang);
      this.updateLangs(nextLangs);
    }
  }, {
    key: 'updateLangs',
    value: function updateLangs(langs) {
      this.writeLangs(langs);
      this.setState({ langs: langs });
    }

    // ------------------------------------------
    // Other handlers
    // ------------------------------------------

  }, {
    key: 'onParseSrcFiles',
    value: function onParseSrcFiles() {
      var _this3 = this;

      this.setState({ fParsing: true });
      (0, _helpers.mutate)({
        description: 'Click on Parse source files',
        Mutation: _mutations.ParseSrcFilesMutation,
        props: { viewerId: this.props.viewer.id },
        onFinish: function onFinish() {
          return _this3.setState({ fParsing: false });
        }
      });
    }

    // ------------------------------------------
    // Helpers
    // ------------------------------------------

  }, {
    key: 'calcStats',
    value: function calcStats() {
      var numUsedKeys = 0;
      var numTranslations = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.viewer.keys.edges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value.node;

          if (key.unusedSince) continue;
          numUsedKeys += 1;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = key.translations.edges[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var translation = _step2.value.node;
              var lang = translation.lang;

              if (numTranslations[lang] == null) numTranslations[lang] = 0;
              numTranslations[lang] += 1;
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

      this.stats = { numUsedKeys: numUsedKeys, numTranslations: numTranslations };
    }
  }]);

  return Translator;
}(_react2.default.PureComponent);

// ------------------------------------------
// Styles
// ------------------------------------------


Translator.propTypes = {
  // lang:                   React.PropTypes.string.isRequired,
  viewer: _react2.default.PropTypes.object.isRequired,
  selectedKeyId: _react2.default.PropTypes.string,
  changeSelectedKey: _react2.default.PropTypes.func.isRequired
};
var style = {
  outer: (0, _giu.flexItem)('1 0 10em', (0, _giu.flexContainer)('column', {
    marginTop: 5
  })),

  body: (0, _giu.flexItem)(1, (0, _giu.flexContainer)('column', { overflowY: 'scroll' })),

  row: (0, _giu.flexItem)('none', (0, _giu.flexContainer)('row')),
  headerRow: {
    position: 'relative',
    fontWeight: 'bold'
  },
  fillerRow: (0, _giu.flexItem)('1 1 0px', (0, _giu.flexContainer)('row')),

  headerCell: {
    paddingTop: 3,
    paddingBottom: 3,
    borderBottom: '1px solid ' + _constants.COLORS.darkest,
    textAlign: 'center',
    fontWeight: 900,
    letterSpacing: 3
  },
  numItems: {
    color: 'darkgrey'
  },
  keyCol: (0, _giu.flexItem)('1 1 0px', {
    backgroundColor: _constants.COLORS.light,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 17
  }),
  langCol: (0, _giu.flexItem)('1 1 0px', {
    backgroundColor: _constants.COLORS.light,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5
  }),
  langSelectorOuter: {
    position: 'relative',
    display: 'inline-block',
    paddingRight: 5
  },
  langSelectorCaret: {
    marginRight: 5
  },
  langSelector: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    opacity: 0,
    cursor: 'pointer'
  },
  addLang: function addLang(fDisabled) {
    var scrollbarWidth = (0, _giu.getScrollbarWidth)();
    return {
      position: 'absolute',
      top: 0,
      right: 5 + scrollbarWidth,
      cursor: fDisabled ? undefined : 'pointer',
      padding: '3px 6px',
      fontWeight: 900,
      letterSpacing: 3
    };
  },

  scrollbarSpacer: function scrollbarSpacer() {
    return (0, _giu.flexItem)('0 0 ' + (0, _giu.getScrollbarWidth)() + 'px');
  }
};

// ------------------------------------------
// Build container
// ------------------------------------------
var TranslatorContainer = _reactRelay2.default.createContainer(Translator, {
  fragments: fragments
});

// ==========================================
// Public API
// ==========================================
exports.default = TranslatorContainer;