"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.phoneNumber = exports.loginSchema = exports.createJobSchema = exports.authSchema = void 0;
var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/keys"));
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _context, _context2, _context3, _context4, _context5, _context6;
var name = (0, _trim["default"])(_context = _joi["default"].string()).call(_context).required().regex(/^[A-Za-z]+$/);
var password = _joi["default"].string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/).label('password is required, must be at least 8 characters and must contain at least a number, one lowercase and one uppercase alphabet');
var email = (0, _trim["default"])(_context2 = _joi["default"].string()).call(_context2).lowercase().email().required().label('email is required, and should follow this format: myemail@domain.com');
var authSchema = (0, _keys["default"])(_context3 = _joi["default"].object()).call(_context3, {
  firstName: name.min(2).max(30).label('firstname is required, must be alphabets only and have at least 2 characters'),
  lastName: name.min(2).max(30).label('lastname is required, must be alphabets only and have at least 2 characters'),
  password: password,
  email: email,
  username: (0, _trim["default"])(_context4 = _joi["default"].string()).call(_context4).min(3)
});
exports.authSchema = authSchema;
var phoneNumber = _joi["default"].string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).required().label('PhoneNumber is required, and should follow this format: +234 70 0000000');
exports.phoneNumber = phoneNumber;
var loginSchema = (0, _keys["default"])(_context5 = _joi["default"].object()).call(_context5, {
  password: password,
  email: email
});
exports.loginSchema = loginSchema;
var createJobSchema = (0, _keys["default"])(_context6 = _joi["default"].object()).call(_context6, {
  title: _joi["default"].string().min(12).max(250).required(),
  description: _joi["default"].string().required(),
  location: _joi["default"].string().min(10),
  longitude: _joi["default"].number(),
  latitude: _joi["default"].number(),
  expertLeve: _joi["default"].string().required(),
  images: _joi["default"].string().required(),
  contractType: _joi["default"].string().required(),
  status: _joi["default"].string().required(),
  numberOfWorkers: _joi["default"].number().integer(),
  budgetFor: _joi["default"].string().required()
});
exports.createJobSchema = createJobSchema;
//# sourceMappingURL=authValidation.js.map