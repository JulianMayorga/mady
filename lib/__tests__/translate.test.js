'use strict';

var _translate = require('../translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Translate library', function () {
  describe('When an unknown key is provided', function () {
    it('leaves it as is if it has no context', function () {
      expect((0, _translate2.default)('Hello')).toBe('Hello');
    });
    it('strips the context prefix out', function () {
      expect((0, _translate2.default)('context_Hullo')).toBe('Hullo');
    });
  });
}); /* eslint-env jest */