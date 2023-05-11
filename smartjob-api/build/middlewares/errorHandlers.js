"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;
var errorHandler = function errorHandler(err, req, res, next) {
  var statusCode = err.status ? err.statusCode : 500;
  res.status(statusCode).json({
    errors: {
      body: [err.message]
    }
  });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandlers.js.map