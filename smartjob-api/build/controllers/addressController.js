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
exports.updateAddressController = exports.getNearestAddressController = exports.createAddressController = void 0;
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _Responses = _interopRequireDefault(require("../utils/Responses"));
var _constants = require("../constants");
var _models = require("../../dbase/models");
var _user = require("../services/user");
var _addressService = require("../services/addressService");
function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context5, _context6; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context5 = ownKeys(Object(source), !0)).call(_context5, function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context6 = ownKeys(Object(source))).call(_context6, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
var createAddressController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user, addressRes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = res.locals.user;
          _context.next = 4;
          return (0, _addressService.createAddress)(_objectSpread({
            userId: user.id
          }, req.body), next);
        case 4:
          addressRes = _context.sent;
          _Responses["default"].setSuccess(201, _constants.ADDRESS_CREATED_SUCCESSFULLY, {
            data: addressRes
          });
          _Responses["default"].send(res);
          _context.next = 13;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          next({
            message: _constants.constStrings.databaseError,
            statusCode: 500
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function createAddressController(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.createAddressController = createAddressController;
var getNearestAddressController = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          try {} catch (error) {}
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getNearestAddressController(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getNearestAddressController = getNearestAddressController;
var updateAddressController = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _context3, addressId, user, _req$body, country, state, city, subUrb, _long, lat, addressObj, dbAddress, updatedAddress;
    return _regenerator["default"].wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          addressId = req.query.addressId;
          user = res.locals.user;
          _req$body = req.body, country = _req$body.country, state = _req$body.state, city = _req$body.city, subUrb = _req$body.subUrb, _long = _req$body["long"], lat = _req$body.lat;
          addressObj = {
            country: country,
            state: state,
            city: city,
            subUrb: subUrb,
            location: {
              type: 'Point',
              coordinates: [_long, lat]
            },
            longitude: _long,
            latitude: lat,
            userId: user.id,
            coordinate: (0, _concat["default"])(_context3 = "".concat(_long, " ")).call(_context3, lat)
          };
          _context4.next = 7;
          return _models.Address.findByPk(addressId);
        case 7:
          dbAddress = _context4.sent;
          if (!(dbAddress.userId !== user.id)) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", next({
            statusCode: 404,
            message: _constants.ADDRESS_CAN_NOT_BE_FOUND
          }));
        case 10:
          _context4.next = 12;
          return _models.Address.update(addressObj, {
            where: {
              id: addressId
            }
          });
        case 12:
          _context4.next = 14;
          return _models.Address.findByPk(addressId);
        case 14:
          updatedAddress = _context4.sent;
          _Responses["default"].setSuccess(201, _constants.ADDRESS_UPDATED_SUCCESSFULLY, updatedAddress);
          _Responses["default"].send(res);
          _context4.next = 22;
          break;
        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](0);
          next({
            message: _context4.t0.message,
            statusCode: 500
          });
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee3, null, [[0, 19]]);
  }));
  return function updateAddressController(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.updateAddressController = updateAddressController;
//# sourceMappingURL=addressController.js.map