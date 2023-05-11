"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandomString = void 0;
var _from = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/from"));
// Create a function for reusable perpose
var generateRandomString = function generateRandomString(myLength) {
  var chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  var randomArray = (0, _from["default"])({
    length: myLength
  }, function (v, k) {
    return chars[Math.floor(Math.random() * chars.length)];
  });
  var randomString = randomArray.join("");
  return randomString;
};
exports.generateRandomString = generateRandomString;
//# sourceMappingURL=function.js.map