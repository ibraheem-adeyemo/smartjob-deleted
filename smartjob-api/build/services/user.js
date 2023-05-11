"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.udpdateUser = exports.login = exports.getAuserWithPK = exports.findUserByEmail = exports.findUserAddress = exports.createUser = exports.addOTPtoDB = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _models = require("../../dbase/models");
var _ErrorResponse = require("../utils/ErrorResponse");
var _function = require("../utils/function");
var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userObj) {
    var _context, response, res, userData, userActivationRes;
    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _models.User.create(userObj);
        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return _models.UserActivation.create({
            hashedSecret: (0, _function.generateRandomString)(60),
            userId: response.id,
            expiredOn: (0, _now["default"])() + 21600000
          });
        case 6:
          res = _context2.sent;
          userData = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            phoneNumber: response.phoneNumber,
            isVerified: response.isVerified,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
            fullName: (0, _concat["default"])(_context = "".concat(response.firstName, " ")).call(_context, response.lastName)
          };
          userActivationRes = {
            hashedSecret: res.hashedSecret,
            expiredOn: res.expiredOn,
            createdAt: res.createdAt,
            updatedAt: res.updatedAt
          };
          return _context2.abrupt("return", {
            userData: userData,
            userActivationRes: userActivationRes
          });
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          throw new Error('Error from database');
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function createUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.createUser = createUser;
var login = function login(loginObj) {
  var email = loginObj.email;
  return _models.User.findOne({
    where: {
      email: email
    }
  });
};
exports.login = login;
var getAuserWithPK = function getAuserWithPK(id) {
  return _models.User.findByPk(id);
};
exports.getAuserWithPK = getAuserWithPK;
var findUserByEmail = function findUserByEmail(email) {
  return _models.User.findOne({
    where: {
      email: email
    }
  });
};
exports.findUserByEmail = findUserByEmail;
var addOTPtoDB = function addOTPtoDB(otp, userId) {
  var expiredOn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _now["default"])() + 21600000;
  return _models.UserActivation.create({
    otp: otp,
    userId: userId,
    expiredOn: expiredOn
  });
};
exports.addOTPtoDB = addOTPtoDB;
var udpdateUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", _models.User.update({
            isVerified: true
          }, {
            where: {
              email: email
            }
          }));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee2);
  }));
  return function udpdateUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.udpdateUser = udpdateUser;
var findUserAddress = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userId) {
    return _regenerator["default"].wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", _models.Address.findAll({
            where: {
              userId: userId
            }
          }));
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee3);
  }));
  return function findUserAddress(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
exports.findUserAddress = findUserAddress;
//# sourceMappingURL=user.js.map