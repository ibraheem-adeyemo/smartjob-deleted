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
exports.verifyToken = exports.uploads = exports.transporter = exports.sendSmsOtp = exports.sendOTP = exports.sendMail = exports.sendEmail = exports.hashPassword = exports.generateToken = exports.generateOTP = exports.courierMailSender = exports.composeVerificationMail = void 0;
var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _multer = _interopRequireDefault(require("multer"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _courier = require("@trycourier/courier");
var _constants = require("../constants");
var _fastTwoSms = _interopRequireDefault(require("fast-two-sms"));
function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context8, _context9; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context8 = ownKeys(Object(source), !0)).call(_context8, function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context9 = ownKeys(Object(source))).call(_context9, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
require('dotenv').config();
var senderEmail = process.env.EMAIL;
var secret = process.env.SECRET;
var passwd = process.env.EMAIL_PASSWORD;
// const eventId = process.env.COURIER_EVENT_ID
// const recipientId = process.env.COURIER_RECIPIENT_ID
var authToken = process.env.COURIER_AUTH_TOKEN;
// const mailTrapUser = process.env.MAIL_TRAP_USER
// const mailTrapPassword = process.env.MAIL_TRAP_PASS
var hostUrl = process.env.HOST_URL;
var nodeMailerHost = process.env.NODE_MAILER_HOST;
var smsAPIUrl = process.env.SMS_API_URL;
var rapidAPIKey = process.env.RAPID_API_KEY;
var rapidAPIHost = process.env.RAPID_API_HOST;

// SET STORAGE
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
var uploads = (0, _multer["default"])({
  storage: storage
});
exports.uploads = uploads;
var hashPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _bcrypt["default"].hash(password, 10);
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.hashPassword = hashPassword;
var generateToken = function generateToken(payload) {
  var jwtSecret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : secret;
  console.log(payload);
  var token = _jsonwebtoken["default"].sign(payload, jwtSecret, {
    expiresIn: '1hr'
  });
  return token;
};
exports.generateToken = generateToken;
var verifyToken = function verifyToken(token) {
  var jwtSecret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : secret;
  var decoded = _jsonwebtoken["default"].verify(token, jwtSecret);
  return decoded;
};
exports.verifyToken = verifyToken;
var sendEmail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(transport, emailData) {
    var emailRes;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return transport.sendMail({
            from: "\"Smartract \"<".concat(senderEmail, ">"),
            // sender address
            to: "".concat(emailData.recipientEmail),
            subject: "".concat(emailData.subject),
            // Subject line
            html: "".concat(emailData.body)
          });
        case 3:
          emailRes = _context2.sent;
          _context2.next = 9;
          break;
        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.log(JSON.parse((0, _stringify["default"])(_context2.t0)));
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return function sendEmail(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
exports.sendEmail = sendEmail;
var generateOTP = function generateOTP(num) {
  var digits = "0123456789";
  var OTP = "";
  for (var i = 0; i < num; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
exports.generateOTP = generateOTP;
var sendOTP = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3, next) {
    var message, phoneNum, res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          message = _ref3.message, phoneNum = _ref3.phoneNum;
          _context3.prev = 1;
          _context3.next = 4;
          return _fastTwoSms["default"].sendMessage({
            authorization: FAST2SMS,
            message: message,
            numbers: [phoneNum]
          });
        case 4:
          res = _context3.sent;
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          next(_context3.t0);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 7]]);
  }));
  return function sendOTP(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
exports.sendOTP = sendOTP;
var axios = require("axios");
var sendSmsOtp = function sendSmsOtp(_ref5, next) {
  var phoneNumber = _ref5.phoneNumber,
    OTP = _ref5.OTP;
  var options = {
    method: 'POST',
    url: smsAPIUrl,
    params: {
      phoneNumber: phoneNumber,
      verifyCode: OTP
    },
    headers: {
      'X-RapidAPI-Key': rapidAPIKey,
      'X-RapidAPI-Host': rapidAPIHost
    }
  };
  axios.request(options).then(function (response) {
    console.log(response.data);
  })["catch"](function (error) {
    console.error(error);
    next(error);
  });
};
exports.sendSmsOtp = sendSmsOtp;
var transporter = function transporter() {
  return _nodemailer["default"].createTransport({
    host: nodeMailerHost,
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: senderEmail,
      pass: passwd
    }
    //   tls: {
    //     rejectUnauthorized: false
    //   }
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: mailTrapUser,
    //     pass: mailTrapPassword
    //   }
  });
};
exports.transporter = transporter;
var composeVerificationMail = function composeVerificationMail(emailData, mailType) {
  var _context4, _context5, _context6, _context7;
  var recipientEmail = emailData.recipientEmail,
    otp = emailData.otp,
    userId = emailData.userId,
    host = emailData.host,
    userFullName = emailData.userFullName;
  switch (mailType) {
    case _constants.constStrings.verifyEmail:
      return {
        recipientEmail: "".concat(recipientEmail),
        subject: 'Email verification',
        body: (0, _concat["default"])(_context4 = "<div>\n                  Hi ".concat(userFullName, " Thank you for Creating an account on SMARTRACT. <br/> continue your registration by copy and paste the OTP below.<br/>\n                  your OTP is ")).call(_context4, otp, "\n                  </div>")
      };
    case _constants.constStrings.forgetPassword:
      return {
        recipientEmail: "".concat(recipientEmail),
        subject: 'Password reset link',
        body: (0, _concat["default"])(_context5 = (0, _concat["default"])(_context6 = (0, _concat["default"])(_context7 = "<div>\n                Hi ".concat(email, " Kindly click on the link below to reset your password.<br /><br/>\n                <a href='")).call(_context7, hostUrl, "/api/v1/users/resetPassword/")).call(_context6, userId, "/")).call(_context5, hashedSecret, "'>Reset password</a> <br /> \n                </div>")
      };
    default:
      break;
  }
};
exports.composeVerificationMail = composeVerificationMail;
var courier = (0, _courier.CourierClient)({
  authorizationToken: authToken
});
//   courier.send({
//    eventId, // your Notification ID
//    recipientId, // usually your system's User ID
//    profile: {
//      email: "<EMAIL_ADDRESS>"
//    },
//    data: {} ,// optional variables for merging into templates 
//     }).then((resp) => {
//      console.log('Email sent', resp)
//    })
//    .catch((error) => {
//      console.error(error)
//    });

var courierMailSender = function courierMailSender(emailData) {
  return courier.send({
    message: {
      to: [{
        user_id: "<USER_ID>",
        // usually your system's User ID associated to a Courier profile
        email: "test@email.com",
        data: {
          name: "some user's name"
        }
      }],
      tokk: {
        data: {
          name: 'emailData?.name'
        },
        email: emailData.recipientEmail
      },
      content: _objectSpread({}, emailData.content),
      routing: {
        method: "single",
        channels: ["email"]
      }
    }
  });
};
exports.courierMailSender = courierMailSender;
var sendMail = function sendMail(emailData, mailType) {
  var mailContent = composeVerificationMail(emailData, mailType);
  console.log(mailContent);
  sendEmail(transporter(), mailContent);
};
exports.sendMail = sendMail;
//# sourceMappingURL=helpers.js.map