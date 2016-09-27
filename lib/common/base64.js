'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var utf8ToBase64 = function utf8ToBase64(str) {
  return new Buffer(str, 'utf8').toString('base64');
};
var base64ToUtf8 = function base64ToUtf8(str) {
  return new Buffer(str, 'base64').toString('utf8');
};

exports.utf8ToBase64 = utf8ToBase64;
exports.base64ToUtf8 = base64ToUtf8;