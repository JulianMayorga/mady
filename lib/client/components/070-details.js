'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._Details = undefined;

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

var _constants = require('../gral/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
          calls: [{
            kind: 'Call',
            metadata: {},
            name: 'id',
            value: {
              kind: 'CallVariable',
              callVariableName: 'details_selectedKeyId'
            }
          }],
          children: [{
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }, {
            fieldName: '__typename',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'String'
          }, {
            children: [{
              fieldName: 'firstUsed',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'unusedSince',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'description',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'sources',
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
            id: _reactRelay2.default.QL.__id(),
            kind: 'Fragment',
            metadata: {},
            name: 'Key',
            type: 'Key'
          }],
          fieldName: 'anyNode',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            inferredRootCallName: 'node',
            inferredPrimaryKey: 'id',
            isAbstract: true
          },
          type: 'Node'
        }, {
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
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

// ==========================================
// Component
// ==========================================

var Details = function (_React$Component) {
  _inherits(Details, _React$Component);

  function Details() {
    _classCallCheck(this, Details);

    return _possibleConstructorReturn(this, (Details.__proto__ || Object.getPrototypeOf(Details)).apply(this, arguments));
  }

  _createClass(Details, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.props.relay.setVariables({ details_selectedKeyId: nextProps.selectedKeyId });
    }
  }, {
    key: 'render',
    value: function render() {
      this.theKey = this.props.viewer.anyNode;
      return _react2.default.createElement(
        'div',
        { style: style.outer },
        _react2.default.createElement(
          'div',
          { style: style.title },
          (0, _translate2.default)('msgDetailsView_Details').toUpperCase()
        ),
        this.renderContents()
      );
    }
  }, {
    key: 'renderContents',
    value: function renderContents() {
      if (this.props.selectedKeyId == null) {
        return _react2.default.createElement(
          _giu.LargeMessage,
          null,
          (0, _translate2.default)('msgDetailsView_No message selected')
        );
      }
      if (!this.theKey) {
        return _react2.default.createElement(
          _giu.LargeMessage,
          null,
          _react2.default.createElement(_giu.Icon, { icon: 'circle-o-notch' })
        );
      }
      var _theKey = this.theKey;
      var description = _theKey.description;
      var sources = _theKey.sources;
      var firstUsed = _theKey.firstUsed;
      var unusedSince = _theKey.unusedSince;

      var since = this.renderDate(firstUsed);
      var until = unusedSince ? _react2.default.createElement(
        'span',
        null,
        ' ',
        (0, _translate2.default)('msgDetailsView_until'),
        ' ',
        this.renderDate(unusedSince)
      ) : ':';
      var elSources = sources.length ? _react2.default.createElement(
        'ul',
        { style: style.srcList },
        sources.map(function (src, idx) {
          return _react2.default.createElement(
            'li',
            { key: idx },
            src
          );
        })
      ) : null;
      return _react2.default.createElement(
        'div',
        null,
        description && _react2.default.createElement(
          'div',
          null,
          description
        ),
        (0, _translate2.default)('msgDetailsView_Used since'),
        ' ',
        since,
        until,
        elSources
      );
    }
  }, {
    key: 'renderDate',
    value: function renderDate(d) {
      return _react2.default.createElement(
        'span',
        { title: (0, _moment2.default)(d).format('LLLL'), style: style.date },
        (0, _moment2.default)(d).fromNow()
      );
    }
  }]);

  return Details;
}(_react2.default.Component);

// ==========================================
// Styles
// ==========================================


Details.propTypes = {
  // lang:                   React.PropTypes.string.isRequired,
  relay: _react2.default.PropTypes.object.isRequired,
  viewer: _react2.default.PropTypes.object.isRequired,
  selectedKeyId: _react2.default.PropTypes.string
};
var style = {
  outer: (0, _giu.flexItem)('none', {
    minHeight: 110,
    backgroundColor: _constants.COLORS.medium,
    padding: 5,
    marginTop: 5
  }),
  title: {
    fontWeight: 900,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 10
  },
  date: {
    fontWeight: 'bold',
    color: '#444'
  },
  srcList: {
    marginTop: 0
  }
};

// ==========================================
// Public API
// ==========================================
exports.default = _reactRelay2.default.createContainer(Details, {
  fragments: fragments,
  initialVariables: { details_selectedKeyId: null }
});
exports._Details = Details;