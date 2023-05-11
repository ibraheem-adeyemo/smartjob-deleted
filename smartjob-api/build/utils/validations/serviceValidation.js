"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.updateServiceSchema = exports.serviceSchema = void 0;
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/keys"));
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _context, _context2;
var serviceSchema = (0, _keys["default"])(_context = _joi["default"].object()).call(_context, {
  workId: _joi["default"].number().integer().required(),
  description: _joi["default"].string().min(20).required(),
  expertLevel: _joi["default"].string().required().label('Expertise level can only be one of beginer, intermediate, expert'),
  yearsOfExperience: _joi["default"].number().integer().required(),
  status: _joi["default"].string().required().label('Available or not available'),
  userId: _joi["default"].number().integer().required(),
  banners: _joi["default"].string().required(),
  location: _joi["default"].required().label('location is required. It can either be id of an existing address or a new address'),
  servicecharge: _joi["default"].required().label('something like [{"amount":1000, "period":"hour"},{"amount":5000, "period":"daily"}]'),
  serviceType: _joi["default"].required().label('["hourly", "daily", "weekly", "biweekly", "monthly"]')
});
exports.serviceSchema = serviceSchema;
var updateServiceSchema = (0, _keys["default"])(_context2 = _joi["default"].object()).call(_context2, {
  description: _joi["default"].string().min(20).optional(),
  expertLevel: _joi["default"].string().optional().label('Expertise level can only be one of beginer, intermediate, expert'),
  yearsOfExperience: _joi["default"].number().integer().optional(),
  status: _joi["default"].string().optional().label('Available or not available'),
  banners: _joi["default"].string().optional()
});
exports.updateServiceSchema = updateServiceSchema;
//# sourceMappingURL=serviceValidation.js.map