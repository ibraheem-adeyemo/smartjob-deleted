"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");
var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");
var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");
var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");
var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");
var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUserController = exports.verifyPhoneController = exports.verifyOTPController = exports.signupController = exports.resetPasswordController = exports.resendVerificationLinkController = exports.resendEmailVerificationOTP = exports.registerPhoneNumberController = exports.loginController = exports.forgetPasswordController = void 0;
var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _constants = require("../constants");
var _user = require("../services/user");
var _ErrorResponse = require("../utils/ErrorResponse");
var _helpers = require("../utils/helpers");
var _Responses = _interopRequireDefault(require("../utils/Responses"));
var _authValidation = require("../utils/validations/authValidation");
var _models = require("../../dbase/models");
var _function = require("../utils/function");
function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context12, _context13; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context12 = ownKeys(Object(source), !0)).call(_context12, function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context13 = ownKeys(Object(source))).call(_context13, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
var secret = process.env.SECRET;
var signupController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user, host, _req$body, name, email, password, username, _name$split, _name$split2, firstName, lastName, userObj, _authSchema$validate, error, value, emailExist, hashedPassword, OTP, activation, otp, userEmail, userId, msg, verifyEmail, jwtToken, emailData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          host = req.headers.host;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, username = _req$body.username;
          _name$split = name.split(' '), _name$split2 = (0, _slicedToArray2["default"])(_name$split, 2), firstName = _name$split2[0], lastName = _name$split2[1];
          userObj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            username: username
          };
          if (!username) {
            _context.next = 10;
            break;
          }
          user = _models.User.findOne({
            where: {
              username: username
            }
          });
          if (!user.username) {
            _context.next = 10;
            break;
          }
          next({
            status: 403,
            message: USERNAME_IS_NOT_AVAILABLE
          });
          return _context.abrupt("return");
        case 10:
          _authSchema$validate = _authValidation.authSchema.validate(userObj), error = _authSchema$validate.error, value = _authSchema$validate.value;
          if (!error) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", next(new _ErrorResponse.ErrorResponse(error.details, 400)));
        case 13:
          _context.next = 15;
          return _models.User.findOne({
            where: {
              email: email
            }
          });
        case 15:
          emailExist = _context.sent;
          if (!emailExist) {
            _context.next = 19;
            break;
          }
          next({
            status: 400,
            message: _constants.EMAIL_ALREADY_EXIST
          });
          return _context.abrupt("return");
        case 19:
          _context.next = 21;
          return (0, _helpers.hashPassword)(value.password);
        case 21:
          hashedPassword = _context.sent;
          // // token should ve removed from the database
          value = _objectSpread(_objectSpread({}, value), {}, {
            password: hashedPassword
          });

          // const userResponse = await createUser(value)
          _context.next = 25;
          return _models.User.create(value);
        case 25:
          user = _context.sent;
          OTP = (0, _helpers.generateOTP)(6);
          _context.next = 29;
          return (0, _user.addOTPtoDB)(OTP, user.id);
        case 29:
          activation = _context.sent;
          otp = activation.otp;
          userEmail = user.email;
          userId = user.id;
          msg = _constants.constStrings.msg, verifyEmail = _constants.constStrings.verifyEmail;
          jwtToken = (0, _helpers.generateToken)({
            email: user.email,
            id: user.id
          });
          emailData = {
            recipientEmail: userEmail,
            otp: otp,
            userId: userId,
            host: host,
            userFullName: name
          };
          (0, _helpers.sendMail)(emailData, verifyEmail);
          // sendSmsOtp({phoneNumber:user.phoneNumber, OTP:`Your OTP is ${OTP}`}, next)

          // const courierRes = await courierMailSender({name:'', recipien: userEmail, content: composeCourierVerificationMail(userEmail, host, token)})
          _Responses["default"].setSuccess(201, msg, {
            jwtToken: jwtToken,
            data: _objectSpread(_objectSpread({}, user.dataValues), {}, {
              password: ''
            })
          });
          _Responses["default"].send(res);
          _context.next = 44;
          break;
        case 41:
          _context.prev = 41;
          _context.t0 = _context["catch"](0);
          next({
            message: _constants.constStrings.databaseError,
            statusCode: 500
          });
        case 44:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 41]]);
  }));
  return function signupController(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.signupController = signupController;
var loginController = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body2, email, password, userObj, _loginSchema$validate, error, value, userRes, token, data, msg;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          userObj = {
            email: email,
            password: password
          };
          _loginSchema$validate = _authValidation.loginSchema.validate(userObj), error = _loginSchema$validate.error, value = _loginSchema$validate.value;
          if (!error) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", next(new _ErrorResponse.ErrorResponse(error.message, 400)));
        case 6:
          _context2.next = 8;
          return (0, _user.login)(userObj);
        case 8:
          userRes = _context2.sent;
          if (userRes.isVerified) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", next({
            statusCode: 400,
            message: _constants.ACCOUNT_HAS_NOT_BEEN_VERIFIED
          }));
        case 11:
          token = (0, _helpers.generateToken)({
            id: userRes.id,
            email: userRes.email
          });
          data = {
            id: userRes.id,
            firstName: userRes.firstName,
            lastName: userRes.lastName,
            email: userRes.email,
            phoneNumber: userRes.phoneNumber,
            isVerified: userRes.isVerified
          };
          msg = _constants.constStrings.msg;
          _Responses["default"].setSuccess(200, _constants.LOGIN_SUCCESSFUL, {
            token: token,
            data: data
          });
          _Responses["default"].send(res);
          _context2.next = 22;
          break;
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          console.log(JSON.parse((0, _stringify["default"])(_context2.t0)), 3);
          next({
            message: _constants.constStrings.databaseError,
            statusCode: 500
          });
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 18]]);
  }));
  return function loginController(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.loginController = loginController;
var verifyOTPController = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var otp, user, userActivation, updatedUser, jwtToken;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          otp = req.body.otp;
          user = res.locals.user;
          _context3.next = 5;
          return _models.UserActivation.findOne({
            where: {
              userId: user.id
            }
          });
        case 5:
          userActivation = _context3.sent;
          if (userActivation) {
            _context3.next = 9;
            break;
          }
          next({
            status: 403,
            message: _constants.ACCOUNT_HAS_ALREADY_VERIFIED
          });
          return _context3.abrupt("return");
        case 9:
          if (!(userActivation.otp !== otp)) {
            _context3.next = 12;
            break;
          }
          next({
            status: 403,
            message: _constants.INCORECT_OTP
          });
          return _context3.abrupt("return");
        case 12:
          _models.UserActivation.destroy({
            where: {
              userId: user.id
            }
          });
          _context3.next = 15;
          return _models.User.update({
            isVerified: true
          }, {
            where: {
              id: user.id
            }
          });
        case 15:
          _context3.next = 17;
          return _models.User.findByPk(user.id);
        case 17:
          updatedUser = _context3.sent;
          jwtToken = (0, _helpers.generateToken)({
            email: user.email,
            id: user.id
          });
          _Responses["default"].setSuccess(201, _constants.EMAIL_VERIFIED_SUCCESSFULLY, {
            jwtToken: jwtToken,
            data: _objectSpread(_objectSpread({}, updatedUser.dataValues), {}, {
              password: ''
            })
          });
          _Responses["default"].send(res);
          _context3.next = 26;
          break;
        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](0);
          // console.log(error, '=======@@@@@@')
          next({
            message: _context3.t0.message,
            statusCode: 500
          });
        case 26:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 23]]);
  }));
  return function verifyOTPController(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.verifyOTPController = verifyOTPController;
var verifyPhoneController = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var otp, user, userActivaton;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          otp = req.body.otp;
          user = res.locals.user;
          _context4.next = 5;
          return _models.UserActivation.findOne({
            where: {
              userId: user.id
            }
          });
        case 5:
          userActivaton = _context4.sent;
          if (userActivaton) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", next({
            status: 403,
            message: _constants.ACCOUNT_HAS_ALREADY_VERIFIED
          }));
        case 8:
          if (!(userActivaton.otp !== otp)) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", next({
            status: 403,
            message: _constants.INCORECT_OTP
          }));
        case 10:
          _models.UserActivation.destroy({
            where: {
              userId: user.id
            }
          });
          _context4.next = 13;
          return _models.Profile.update({
            isPhoneNumberVerified: true
          }, {
            where: {
              UserId: user.id
            }
          });
        case 13:
          _Responses["default"].setSuccess(201, _constants.EMAIL_VERIFIED_SUCCESSFULLY, {
            data: {}
          });
          _Responses["default"].send(res);
          _context4.next = 20;
          break;
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          next({
            message: _constants.constStrings.databaseError,
            statusCode: 500
          });
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 17]]);
  }));
  return function verifyPhoneController(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
exports.verifyPhoneController = verifyPhoneController;
var verifyUserController = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _req$query, hashedSecret, email, id, user, userActivationData, updatedUser;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$query = req.query, hashedSecret = _req$query.hashedSecret, email = _req$query.email, id = _req$query.id;
          _context5.next = 4;
          return (0, _user.getAuserWithPK)(id);
        case 4:
          user = _context5.sent;
          if (!user) {
            next({
              message: 'User could not be found',
              statusCode: 404
            });
          }
          _context5.next = 8;
          return _models.UserActivation.findOne({
            where: {
              userId: user.id
            }
          });
        case 8:
          userActivationData = _context5.sent;
          if (!userActivationData) {
            // Responses.setError(404, 'Account has been verified');
            // Responses.send(res)
            next({
              message: 'Account has been verified',
              statusCode: 401
            });
          }
          if (!((userActivationData === null || userActivationData === void 0 ? void 0 : userActivationData.hashedSecret) === hashedSecret && email === user.email)) {
            _context5.next = 19;
            break;
          }
          _context5.next = 13;
          return (0, _user.udpdateUser)(email);
        case 13:
          updatedUser = _context5.sent;
          _models.UserActivation.destroy({
            where: {
              userId: id
            }
          });
          _Responses["default"].setSuccess(200, 'Email has been verified successfully');
          _Responses["default"].send(res);
          _context5.next = 20;
          break;
        case 19:
          next({
            message: 'Unauthorized',
            statusCode: 401
          });
        case 20:
          _context5.next = 25;
          break;
        case 22:
          _context5.prev = 22;
          _context5.t0 = _context5["catch"](0);
          next({
            message: _context5.t0.message,
            statusCode: 401
          });
        case 25:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 22]]);
  }));
  return function verifyUserController(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
exports.verifyUserController = verifyUserController;
var resendEmailVerificationOTP = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var _context6, host, email, user, jwtToken, OTP, activation, otp, userEmail, userId, emailData, msg, verifyEmail;
    return _regenerator["default"].wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          host = req.headers.host;
          email = req.body.email;
          _context7.next = 5;
          return _models.User.findOne({
            where: {
              email: email
            }
          });
        case 5:
          user = _context7.sent;
          if (!(!user || user.email !== email)) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", next({
            statusCode: 404,
            message: _constants.EMAIIL_CAN_NOT_BE_FOUND
          }));
        case 8:
          _models.UserActivation.destroy({
            where: {
              userId: user.id
            }
          });
          jwtToken = (0, _helpers.generateToken)({
            email: user.email,
            id: user.id
          });
          OTP = (0, _helpers.generateOTP)(6);
          _context7.next = 13;
          return (0, _user.addOTPtoDB)(OTP, user.id);
        case 13:
          activation = _context7.sent;
          otp = activation.otp;
          userEmail = user.email;
          userId = user.id;
          emailData = {
            recipientEmail: userEmail,
            otp: otp,
            userId: userId,
            host: host,
            userFullName: (0, _concat["default"])(_context6 = "".concat(user.firstName, " ")).call(_context6, user.lastName)
          };
          msg = _constants.constStrings.msg, verifyEmail = _constants.constStrings.verifyEmail;
          (0, _helpers.sendMail)(emailData, verifyEmail);
          _Responses["default"].setSuccess(201, msg, {
            token: jwtToken
          });
          _Responses["default"].send(res);
          _context7.next = 28;
          break;
        case 24:
          _context7.prev = 24;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          next({
            message: _context7.t0.message,
            statusCode: 401
          });
        case 28:
        case "end":
          return _context7.stop();
      }
    }, _callee6, null, [[0, 24]]);
  }));
  return function resendEmailVerificationOTP(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
exports.resendEmailVerificationOTP = resendEmailVerificationOTP;
var registerPhoneNumberController = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var user, phoneNumber, otp;
    return _regenerator["default"].wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          user = res.locals.user;
          phoneNumber = req.body.phoneNumber;
          otp = (0, _helpers.generateOTP)(6);
          _context8.next = 6;
          return _models.User.update({
            phoneNumber: phoneNumber
          }, {
            where: {
              id: user.id
            }
          });
        case 6:
          _context8.next = 8;
          return (0, _user.addOTPtoDB)(otp, user.id);
        case 8:
          (0, _helpers.sendSmsOtp)({
            phoneNumber: phoneNumber,
            OTP: otp
          }, next);
          _Responses["default"].setSuccess(201, _constants.PHONE_OTP_SENT);
          _Responses["default"].send(res);
          _context8.next = 16;
          break;
        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);
          // console.log(error)
          next({
            message: _constants.constStrings.databaseError,
            statusCode: 500
          });
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee7, null, [[0, 13]]);
  }));
  return function registerPhoneNumberController(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
exports.registerPhoneNumberController = registerPhoneNumberController;
var resendVerificationLinkController = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var _req$params, token, host, userRes, msg, verifyUser;
    return _regenerator["default"].wrap(function _callee8$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          try {
            host = req.headers.host;
            token = (_req$params = req.params, targertMail = _req$params.targertMail, _req$params);
            userRes = (0, _user.findUserByEmail)(targertMail);
            msg = _constants.constStrings.msg, verifyUser = _constants.constStrings.verifyUser;
            token = (0, _helpers.generateToken)({
              email: userRes.email,
              id: userRes.id
            });
            (0, _helpers.sendMail)(userRes.email, host, token, verifyUser);
            _Responses["default"].setSuccess(201, msg, {
              token: token
            });
            _Responses["default"].send(res);
          } catch (error) {
            next({
              message: _constants.constStrings.databaseError,
              statusCode: 500
            });
          }
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee8);
  }));
  return function resendVerificationLinkController(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();
exports.resendVerificationLinkController = resendVerificationLinkController;
var forgetPasswordController = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var host, email, userRes, _secret, token, randomString, emailData, forgetPassword, resetPasswordLinkSuccess;
    return _regenerator["default"].wrap(function _callee9$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          host = req.headers.host;
          email = req.body.email;
          _context10.next = 5;
          return (0, _user.findUserByEmail)(email);
        case 5:
          userRes = _context10.sent;
          if (!userRes) {
            next({
              message: 'User could not be found',
              statusCode: 404
            });
          }
          _secret = process.env.SECRET + userRes.password;
          token = (0, _helpers.generateToken)({
            email: userRes.email,
            id: userRes.id
          }, _secret);
          randomString = (0, _function.generateRandomString)(60);
          emailData = {
            recipientEmail: userRes.email,
            hashedSecret: token,
            userId: '',
            host: host,
            userFullName: 'User'
          };
          forgetPassword = _constants.constStrings.forgetPassword, resetPasswordLinkSuccess = _constants.constStrings.resetPasswordLinkSuccess;
          (0, _helpers.sendMail)(emailData, forgetPassword);
          _Responses["default"].setSuccess(200, resetPasswordLinkSuccess);
          _Responses["default"].send(res);
          _context10.next = 20;
          break;
        case 17:
          _context10.prev = 17;
          _context10.t0 = _context10["catch"](0);
          next({
            message: _constants.constStrings.databaseError,
            statusCode: 500
          });
        case 20:
        case "end":
          return _context10.stop();
      }
    }, _callee9, null, [[0, 17]]);
  }));
  return function forgetPasswordController(_x25, _x26) {
    return _ref9.apply(this, arguments);
  };
}();
exports.forgetPasswordController = forgetPasswordController;
var resetPasswordController = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var _req$params2, id, token, userRes, _secret2, payload, newToken;
    return _regenerator["default"].wrap(function _callee10$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$params2 = req.params, id = _req$params2.id, token = _req$params2.token;
          _context11.next = 4;
          return (0, _user.getAuserWithPK)(id);
        case 4:
          userRes = _context11.sent;
          if (!userRes) {
            next({
              message: 'User could not be found',
              statusCode: 404
            });
          }
          _secret2 = process.env.SECRET + userRes.password;
          payload = (0, _helpers.verifyToken)(token, _secret2);
          if (id !== payload.id) {
            next({
              message: 'Unauthorized',
              statusCode: 401
            });
          }
          newToken = (0, _helpers.generateToken)({
            email: payload.email,
            id: userRes.id
          }, _secret2);
          _Responses["default"].setSuccess(200, {
            token: newToken,
            message: 'You can now redirect to reset password page'
          });
          _Responses["default"].send(res);
          _context11.next = 17;
          break;
        case 14:
          _context11.prev = 14;
          _context11.t0 = _context11["catch"](0);
          next({
            message: 'There is error in redirect user to reset password page',
            statusCode: 500
          });
        case 17:
        case "end":
          return _context11.stop();
      }
    }, _callee10, null, [[0, 14]]);
  }));
  return function resetPasswordController(_x27, _x28, _x29) {
    return _ref10.apply(this, arguments);
  };
}();
exports.resetPasswordController = resetPasswordController;
//# sourceMappingURL=userController.js.map