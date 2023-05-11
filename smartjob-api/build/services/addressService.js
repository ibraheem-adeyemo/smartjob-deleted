"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.createAddress = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _user = require("./user");
var _models = require("../../dbase/models");
var createAddress = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(addObj, next) {
    var _context;
    var country, state, city, subUrb, _long, lat, _addObj$userId, userId, _addObj$serviceId, serviceId, _addObj$jobId, jobId, addressObj, userAddress;
    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          country = addObj.country, state = addObj.state, city = addObj.city, subUrb = addObj.subUrb, _long = addObj["long"], lat = addObj.lat, _addObj$userId = addObj.userId, userId = _addObj$userId === void 0 ? null : _addObj$userId, _addObj$serviceId = addObj.serviceId, serviceId = _addObj$serviceId === void 0 ? null : _addObj$serviceId, _addObj$jobId = addObj.jobId, jobId = _addObj$jobId === void 0 ? null : _addObj$jobId;
          addressObj = {
            country: country,
            state: state,
            city: city,
            subUrb: subUrb,
            location: {
              type: 'Point',
              coordinates: [_long, lat],
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:4326'
                }
              }
            },
            location_m: {
              type: 'Point',
              coordinates: [_long, lat],
              crs: {
                type: 'name',
                properties: {
                  name: 'EPSG:3857'
                }
              }
            },
            longitude: _long,
            latitude: lat,
            coordinate: (0, _concat["default"])(_context = "".concat(_long, " ")).call(_context, lat),
            userId: userId,
            serviceId: serviceId,
            jobId: jobId
          };
          _context2.next = 4;
          return (0, _user.findUserAddress)(userId);
        case 4:
          userAddress = _context2.sent;
          if (!(userAddress.length > 0)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", next({
            statusCode: 403,
            message: ADDRESS_ALREADY_CREATED
          }));
        case 7:
          _context2.next = 9;
          return _models.Address.create(addressObj);
        case 9:
          return _context2.abrupt("return", _context2.sent);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee);
  }));
  return function createAddress(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createAddress = createAddress;
//# sourceMappingURL=addressService.js.map