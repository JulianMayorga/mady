'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewerQuery = undefined;

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewerQuery = exports.ViewerQuery = function (_Relay$Route) {
  _inherits(ViewerQuery, _Relay$Route);

  function ViewerQuery() {
    _classCallCheck(this, ViewerQuery);

    return _possibleConstructorReturn(this, (ViewerQuery.__proto__ || Object.getPrototypeOf(ViewerQuery)).apply(this, arguments));
  }

  return ViewerQuery;
}(_reactRelay2.default.Route);

/*
export class NodeQuery extends Relay.Route {
  static routeName = 'NodeQuery';
  static queries = {
    node: () => Relay.QL`query {node(id: $id)}`,
  };
  static paramDefinitions = {
    id: { required: true },
  };
}
*/


ViewerQuery.routeName = 'ViewerQuery';
ViewerQuery.queries = {
  viewer: function viewer() {
    return function () {
      return {
        children: [{
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'viewer',
        kind: 'Query',
        metadata: {},
        name: 'RootQueries',
        type: 'Viewer'
      };
    }();
  }
};