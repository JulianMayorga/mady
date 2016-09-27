'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _header = require('../050-header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('react-dom'); /* eslint-env jest */


describe('Header', function () {
  it('renders correctly', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_header2.default, { onShowSettings: function onShowSettings() {} })).toJSON();
    expect(tree).toMatchSnapshot();
  });
});