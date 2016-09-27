'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _es = require('react-intl/locale-data/es');

var _es2 = _interopRequireDefault(_es);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactIntl.addLocaleData)(_es2.default);

(0, _reactIntl.defineMessages)({
  reactIntlSample1: {
    id: 'reactIntlSample1',
    description: 'Message to greet the user',
    defaultMessage: 'someContext_Hello, {NAME}!'
  }
});

var Example = function Example(_ref) {
  var lang = _ref.lang;
  var messages = _ref.messages;

  var name = 'Eric';
  var unreadCount = 1000;
  return _react2.default.createElement(
    _reactIntl.IntlProvider,
    { key: lang, locale: lang, messages: messages },
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(_reactIntl.FormattedMessage, {
        id: 'reactIntlSample2',
        defaultMessage: 'someContext_Hello {NAME}, you have {UNREAD_COUNT, number} {UNREAD_COUNT, plural,\n              one {message}\n              other {messages}\n            }',
        values: { NAME: _react2.default.createElement(
            'b',
            null,
            name
          ), UNREAD_COUNT: unreadCount }
      }),
      _react2.default.createElement('br', null),
      _react2.default.createElement(_reactIntl.FormattedHTMLMessage, {
        id: 'reactIntlSample3',
        defaultMessage: 'someContext_<i>Hi</i> <b>{NAME}</b>!',
        values: { NAME: name, unreadCount: unreadCount }
      })
    )
  );
};

Example.propTypes = {
  lang: _react2.default.PropTypes.string.isRequired,
  messages: _react2.default.PropTypes.object.isRequired
};

exports.default = Example;