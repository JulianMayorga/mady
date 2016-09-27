"use strict";

/* eslint-disable */
function anonymous() {
  var number = function number(value, offset) {
    if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
    return value - (offset || 0);
  };
  var plural = function plural(value, offset, lcfunc, data, isOrdinal) {
    if ({}.hasOwnProperty.call(data, value)) return data[value]();
    if (offset) value -= offset;
    var key = lcfunc(value, isOrdinal);
    if (key in data) return data[key]();
    return data.other();
  };
  var select = function select(value, data) {
    if ({}.hasOwnProperty.call(data, value)) return data[value]();
    return data.other();
  };
  var pluralFuncs = {
    en: function en(n, ord) {
      var s = String(n).split('.'),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? 'one' : n10 == 2 && n100 != 12 ? 'two' : n10 == 3 && n100 != 13 ? 'few' : 'other';
      return n == 1 && v0 ? 'one' : 'other';
    }
  };
  var fmt = {};

  return {
    c29tZUNvbnRleHRfe05VTSwgcGx1cmFsLCBvbmV7MSBoYW1idXJnZXJ9IG90aGVyeyMgaGFtYnVyZ2Vyc319: function c29tZUNvbnRleHRfe05VTSwgcGx1cmFsLCBvbmV7MSBoYW1idXJnZXJ9IG90aGVyeyMgaGFtYnVyZ2Vyc319(d) {
      return plural(d.NUM, 0, pluralFuncs.en, { one: function one() {
          return "1 hamburger";
        }, other: function other() {
          return number(d.NUM) + " hamburgers";
        } });
    }
  };
};
module.exports = anonymous();
/* eslint-enable */