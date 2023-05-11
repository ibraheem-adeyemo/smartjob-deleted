"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.isUserVerifiedAndAuthenticated = exports.isUserVerified = exports.isUserExist = exports.isPhoneNumberAlreadyExist = exports.isLoggedIn = exports.isEmailVerified = exports.isAuthenticated = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _models = require("../../dbase/models");
var _helpers = require("../utils/helpers");
var _Responses = _interopRequireDefault(require("../utils/Responses"));
var _constants = require("../constants");
var isUserExist = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var email, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          _context.next = 3;
          return _models.User.findOne({
            where: {
              email: email
            }
          });
        case 3:
          user = _context.sent;
          if (!user) {
            next();
          } else {
            _Responses["default"].setError(302, 'Kindly login as this email is registered to an account or use another email to create account');
            _Responses["default"].send(res);
          }
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function isUserExist(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.isUserExist = isUserExist;
var isLoggedIn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var authorization, payload, userRes;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          authorization = req.headers.authorization;
          payload = (0, _helpers.verifyToken)(authorization.split(' ')[1]);
          if (!payload.email) {
            _context2.next = 8;
            break;
          }
          _context2.next = 6;
          return _models.User.findByPK(payload.id);
        case 6:
          userRes = _context2.sent;
          if (payload.email === userRes.email) {
            req.userObj = userRes;
            next();
          } else {}
        case 8:
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          _Responses["default"].setError(401, 'Token has expired or invalid');
          _Responses["default"].send(res);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function isLoggedIn(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.isLoggedIn = isLoggedIn;
var isUserVerified = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var authorization, payload;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          try {
            authorization = req.headers.authorization;
            payload = (0, _helpers.verifyToken)(authorization.split(' ')[1]);
          } catch (error) {
            console.log(error);
          }
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function isUserVerified(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.isUserVerified = isUserVerified;
var isAuthenticated = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var authorization, token, payload, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          authorization = req.headers.authorization;
          if (authorization) {
            _context4.next = 5;
            break;
          }
          next({
            status: 403,
            message: _constants.AUTH_HEADER_MISSING_ERR
          });
          return _context4.abrupt("return");
        case 5:
          token = authorization.split(' ')[1];
          if (token) {
            _context4.next = 9;
            break;
          }
          next({
            status: 403,
            message: _constants.AUTH_TOKEN_MISSING_ERR
          });
          return _context4.abrupt("return");
        case 9:
          payload = (0, _helpers.verifyToken)(token);
          if (payload) {
            _context4.next = 13;
            break;
          }
          next({
            status: 403,
            message: JWT_DECODE_ERR
          });
          return _context4.abrupt("return");
        case 13:
          _context4.next = 15;
          return _models.User.findByPk(payload.id);
        case 15:
          user = _context4.sent;
          if (user) {
            _context4.next = 19;
            break;
          }
          next({
            status: 404,
            message: _constants.USER_NOT_FOUND_ERR
          });
          return _context4.abrupt("return");
        case 19:
          res.locals.user = user;
          next();
          return _context4.abrupt("return", user);
        case 24:
          _context4.prev = 24;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 27:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 24]]);
  }));
  return function isAuthenticated(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
exports.isAuthenticated = isAuthenticated;
var isUserVerifiedAndAuthenticated = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return isAuthenticated(req, res, next);
        case 3:
          user = _context5.sent;
          if (user.isVerified) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", next({
            statusCode: 400,
            message: _constants.ACCOUNT_HAS_NOT_BEEN_VERIFIED
          }));
        case 6:
          res.locals.user = user;
          next();
          _context5.next = 13;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function isUserVerifiedAndAuthenticated(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
exports.isUserVerifiedAndAuthenticated = isUserVerifiedAndAuthenticated;
var isEmailVerified = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var email, user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          email = req.body.email;
          _context6.next = 4;
          return _models.User.findOne({
            where: {
              email: email
            }
          });
        case 4:
          user = _context6.sent;
          if (user) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", next({
            statusCode: 400,
            message: _constants.USER_NOT_FOUND_ERR
          }));
        case 7:
          if (user.isVerified) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", next({
            statusCode: 400,
            message: _constants.ACCOUNT_HAS_NOT_BEEN_VERIFIED
          }));
        case 9:
          next();
          _context6.next = 15;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 12]]);
  }));
  return function isEmailVerified(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
exports.isEmailVerified = isEmailVerified;
var isPhoneNumberAlreadyExist = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var phoneNumber, user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          phoneNumber = req.body.phoneNumber;
          _context7.next = 4;
          return _models.User.findOne({
            where: {
              phoneNumber: phoneNumber
            }
          });
        case 4:
          user = _context7.sent;
          if (!user) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", next({
            status: 403,
            message: _constants.PHONE_ALREADY_EXISTS_ERR
          }));
        case 7:
          next();
          _context7.next = 13;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function isPhoneNumberAlreadyExist(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
exports.isPhoneNumberAlreadyExist = isPhoneNumberAlreadyExist;
//# sourceMappingURL=authMiddleware.js.map