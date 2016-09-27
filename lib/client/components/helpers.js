'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutate = undefined;

var _timm = require('timm');

var _timm2 = _interopRequireDefault(_timm);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _storyboard = require('storyboard');

var _giu = require('giu');

var _translate = require('../../translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Runs a Relay mutation inside a Storyboard story
function mutate(options) {
  var description = options.description;
  var Mutation = options.Mutation;
  var props = options.props;
  var _onFailure = options.onFailure;
  var _onSuccess = options.onSuccess;
  var onFinish = options.onFinish;

  var story = _storyboard.mainStory.child({
    src: 'views',
    title: description
  });
  var finalProps = _timm2.default.set(props, 'storyId', story.storyId);
  var mutation = new Mutation(finalProps);
  _reactRelay2.default.Store.commitUpdate(mutation, {
    onFailure: function onFailure(transaction) {
      var error = transaction.getError() || new Error('Mutation failed');
      story.error('views', 'Transaction error:', { attach: error });
      story.close();
      if (_onFailure) {
        _onFailure(transaction);
      } else {
        (0, _giu.notify)({
          title: (0, _translate2.default)('error_Changes could not be saved'),
          msg: (0, _translate2.default)('error_Is the server running?'),
          type: 'error',
          icon: 'save'
        });
      }
      if (onFinish) onFinish();
    },
    onSuccess: function onSuccess(response) {
      story.debug('views', 'Transaction result:', {
        attach: response,
        attachLevel: 'trace'
      });
      story.close();
      if (_onSuccess) _onSuccess(response);
      if (onFinish) onFinish();
    }
  });
}

exports.mutate = mutate;