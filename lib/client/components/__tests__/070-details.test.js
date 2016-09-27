'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _details = require('../070-details');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/facebook/react/issues/7386#issuecomment-238091398
jest.mock('react-dom');

// ======================================================
// Fixtures
// ======================================================
/* eslint-env jest */
var KEY_ID = 'keyId';

var VIEWER_WITHOUT_KEY = {
  id: 'me'
};

var VIEWER_WITH_KEY_USED = {
  id: 'me',
  anyNode: {
    firstUsed: '2016-04-18T05:37:47.074Z',
    unusedSince: null,
    description: 'Some details',
    sources: ['src/client/components/060-translator.js']
  }
};

var VIEWER_WITH_KEY_UNUSED = {
  id: 'me',
  anyNode: {
    firstUsed: '2016-04-18T05:37:47.074Z',
    unusedSince: '2016-04-21T05:37:47.074Z',
    description: 'Some details',
    sources: []
  }
};

var RELAY_MOCK = {
  setVariables: jest.fn()
};

// ======================================================
// Tests
// ======================================================
describe('Details', function () {
  it('renders correctly without a selection', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_details._Details, {
      relay: RELAY_MOCK,
      viewer: VIEWER_WITHOUT_KEY,
      selectedKeyId: null
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a selection but no data yet', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_details._Details, {
      relay: RELAY_MOCK,
      viewer: VIEWER_WITHOUT_KEY,
      selectedKeyId: KEY_ID
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('when the details for the selection are available', function () {
    it('renders correctly for a message that is used', function () {
      var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_details._Details, {
        relay: RELAY_MOCK,
        viewer: VIEWER_WITH_KEY_USED,
        selectedKeyId: KEY_ID
      })).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly for a message that is unused', function () {
      var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_details._Details, {
        relay: RELAY_MOCK,
        viewer: VIEWER_WITH_KEY_UNUSED,
        selectedKeyId: KEY_ID
      })).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});