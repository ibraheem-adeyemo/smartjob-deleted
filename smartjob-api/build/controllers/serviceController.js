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
exports.updateServiceController = exports.nearRestServiceController = exports.getAllServicesController = exports.deleteServiceController = exports.createServiceController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _Responses = _interopRequireDefault(require("../utils/Responses"));
var _serviceServices = require("../services/serviceServices");
var _models = require("../../dbase/models");
var _serviceValidation = require("../utils/validations/serviceValidation");
var _constants = require("../constants");
var _user = require("../services/user");
var _serviceSQL = require("../utils/sqls/serviceSQL");
var _addressService = require("../services/addressService");
function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context5, _context6; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context5 = ownKeys(Object(source), !0)).call(_context5, function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context6 = ownKeys(Object(source))).call(_context6, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
var createServiceController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$file, _userHaveTheAddress, _userHaveTheAddress2, user, _req$body, workId, description, location, expertLevel, yearsOfExperience, video, serviceType, status, servicecharge, banners, service, _serviceSchema$valida, error, value, locationObj, longitude, latitude, userHaveTheAddress, serviceChargeObj, serviceTypeObj, serviceObj, userHasCreatedTheService, newService, newAddress, serviceResponse;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = res.locals.user;
          _req$body = req.body, workId = _req$body.workId, description = _req$body.description, location = _req$body.location, expertLevel = _req$body.expertLevel, yearsOfExperience = _req$body.yearsOfExperience, video = _req$body.video, serviceType = _req$body.serviceType, status = _req$body.status, servicecharge = _req$body.servicecharge;
          banners = req === null || req === void 0 ? void 0 : (_req$file = req.file) === null || _req$file === void 0 ? void 0 : _req$file.originalname;
          service = {
            workId: workId,
            description: description,
            location: location,
            expertLevel: expertLevel,
            yearsOfExperience: yearsOfExperience,
            serviceType: serviceType,
            status: status,
            servicecharge: servicecharge,
            banners: banners,
            userId: user.id
          };
          _serviceSchema$valida = _serviceValidation.serviceSchema.validate(service), error = _serviceSchema$valida.error, value = _serviceSchema$valida.value;
          if (!error) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", next({
            status: 403,
            message: error.message
          }));
        case 8:
          locationObj = JSON.parse(location);
          longitude = locationObj.longitude, latitude = locationObj.latitude;
          userHaveTheAddress = [];
          if (!(typeof location !== 'number')) {
            _context.next = 15;
            break;
          }
          _context.next = 14;
          return (0, _user.findUserAddress)(user.id);
        case 14:
          userHaveTheAddress = _context.sent;
        case 15:
          serviceChargeObj = JSON.parse(servicecharge);
          serviceTypeObj = JSON.parse(serviceType);
          serviceObj = {
            workId: workId,
            description: description,
            expertLevel: expertLevel,
            yearsOfExperience: yearsOfExperience,
            status: status,
            video: video,
            userId: user.id,
            banners: banners,
            location: typeof location == 'number' ? location : userHaveTheAddress.length > 0 ? userHaveTheAddress[0].id : null
          };
          _context.next = 20;
          return _models.Service.findOne({
            where: {
              userId: user.id,
              workId: workId
            }
          });
        case 20:
          userHasCreatedTheService = _context.sent;
          if (!userHasCreatedTheService) {
            _context.next = 24;
            break;
          }
          next({
            status: 403,
            message: _constants.SERVICE_EXIST_ALREADY
          });
          return _context.abrupt("return");
        case 24:
          _context.next = 26;
          return _models.Service.create(serviceObj);
        case 26:
          newService = _context.sent;
          if (((_userHaveTheAddress = userHaveTheAddress) === null || _userHaveTheAddress === void 0 ? void 0 : _userHaveTheAddress.length) > 0) {
            _models.Address.update({
              serviceId: newService.id
            }, {
              where: {
                userId: user.id
              }
            });
          }
          if (typeof location == 'number') {
            _models.Address.update({
              serviceId: newService.id
            }, {
              where: {
                userId: user.id
              }
            });
          }
          if (!(typeof location !== 'number' && ((_userHaveTheAddress2 = userHaveTheAddress) === null || _userHaveTheAddress2 === void 0 ? void 0 : _userHaveTheAddress2.length) < 1)) {
            _context.next = 34;
            break;
          }
          _context.next = 32;
          return (0, _addressService.createAddress)(_objectSpread({
            userId: user.id,
            serviceId: newService.id
          }, locationObj));
        case 32:
          newAddress = _context.sent;
          // Address.create({...locationObj, location: {type:'Point', coordinates:[longitude,latitude], crs: { type: 'name', properties: { name: 'EPSG:4326'} }}, userId:user.id, coordinate:`${longitude} ${latitude}`, serviceId:newService.id})

          _models.Service.update({
            location: newAddress.id
          }, {
            where: {
              id: newService.id
            }
          });
        case 34:
          _context.next = 36;
          return _models.Charges.bulkCreate((0, _toConsumableArray2["default"])((0, _map["default"])(serviceChargeObj).call(serviceChargeObj, function (charg) {
            return _objectSpread(_objectSpread({}, charg), {}, {
              UserId: user.id,
              ServiceId: newService.id
            });
          })));
        case 36:
          _context.next = 38;
          return _models.ServiceType.bulkCreate((0, _toConsumableArray2["default"])((0, _map["default"])(serviceTypeObj).call(serviceTypeObj, function (type) {
            return {
              typeOfService: type,
              ServiceId: newService.id
            };
          })));
        case 38:
          _context.next = 40;
          return _models.Service.findByPk(newService.id, {
            include: [{
              model: _models.Address
            }, {
              model: _models.Charges
            }, {
              model: _models.ServiceType
            }]
          });
        case 40:
          serviceResponse = _context.sent;
          _Responses["default"].setSuccess(200, 'you just created a Service', {
            serviceResponse: serviceResponse
          });
          _Responses["default"].send(res);
          _context.next = 48;
          break;
        case 45:
          _context.prev = 45;
          _context.t0 = _context["catch"](0);
          next({
            message: _context.t0.message,
            statusCode: 500
          });
        case 48:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 45]]);
  }));
  return function createServiceController(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.createServiceController = createServiceController;
var getAllServicesController = function getAllServicesController(req, res) {
  _Responses["default"].setSuccess(200, 'endpoint to get all Services');
  _Responses["default"].send(res);
};
exports.getAllServicesController = getAllServicesController;
var updateServiceController = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var user, serviceId, _req$body2, description, expertLevel, yearsOfExperience, status, serviceObj, _updateServiceSchema$, err, value, service, updatedService;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user = res.locals.user;
          serviceId = req.query.serviceId;
          _req$body2 = req.body, description = _req$body2.description, expertLevel = _req$body2.expertLevel, yearsOfExperience = _req$body2.yearsOfExperience, status = _req$body2.status;
          serviceObj = {
            description: description,
            expertLevel: expertLevel,
            yearsOfExperience: yearsOfExperience,
            status: status
          };
          _updateServiceSchema$ = _serviceValidation.updateServiceSchema.validate(serviceObj), err = _updateServiceSchema$.err, value = _updateServiceSchema$.value;
          if (!err) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", next({
            statusCode: 403,
            message: err.message
          }));
        case 8:
          _context2.next = 10;
          return _models.Service.findByPk(serviceId);
        case 10:
          service = _context2.sent;
          if (service) {
            _context2.next = 13;
            break;
          }
          return _context2.abrupt("return", next({
            status: 404,
            message: _constants.SERVICE_NOT_FOUND
          }));
        case 13:
          if (!(service.userId !== user.id)) {
            _context2.next = 15;
            break;
          }
          return _context2.abrupt("return", next({
            status: 400,
            message: _constants.BAD_REQUEST
          }));
        case 15:
          _context2.next = 17;
          return _models.Service.update(_objectSpread({}, serviceObj), {
            where: {
              id: serviceId
            }
          });
        case 17:
          _context2.next = 19;
          return _models.Service.findByPk(serviceId);
        case 19:
          updatedService = _context2.sent;
          _Responses["default"].setSuccess(200, '', updatedService);
          _Responses["default"].send(res);
          _context2.next = 27;
          break;
        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](0);
          next({
            message: _context2.t0.message,
            statusCode: 500
          });
        case 27:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 24]]);
  }));
  return function updateServiceController(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.updateServiceController = updateServiceController;
var deleteServiceController = function deleteServiceController(req, res) {
  _Responses["default"].setSuccess(200, 'endpoint to delete a single Service');
  _Responses["default"].send(res);
};
exports.deleteServiceController = deleteServiceController;
var nearRestServiceController = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var _context3, _req$query, _long, lat, workId, location, _yield$sequelize$quer, _yield$sequelize$quer2, results, metadata;
    return _regenerator["default"].wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$query = req.query, _long = _req$query["long"], lat = _req$query.lat, workId = _req$query.workId;
          location = _models.sequelize.literal((0, _concat["default"])(_context3 = "ST_GeomFromText('POINT(".concat(_long, " ")).call(_context3, lat, ")', 4326)")); // const nearestServices = await Service.findAll({
          //     where: {
          //         workId
          //     },
          //     include: {
          //         model: Address,
          //         where: {
          //             location:[[sequelize.fn('ST_Distance_Sphere', sequelize.literal('geolocation'), location),'distance']],
          //             // [[sequelize.literal("6371 * acos(cos(radians("+lat+")) * cos(radians("+lat+")) * cos(radians("+long+")) - radians(longitude)) + sin(radians("+lat+")) * sin(radians(latitude)))"),'distance']],
          //             order: 'distance', //sequelize.col('distance'),
          //             limit: 4
          //         }
          //     }
          // })
          _context4.next = 5;
          return _models.sequelize.query((0, _serviceSQL.getNearestServiceSql)(workId, lat, _long)

          // `SELECT * FROM addresses WHERE ST_Within(ST_TRANSFORM(ST_SRID(location, 4326), 3857), ST_Buffer(
          //     ST_TRANSFORM(
          //     ST_PointFromText('POINT(${lat} ${long})', 4326)
          //     , 3857), 17000)) INNER JOIN services ON workId = ${workId};
          // `
          // "SELECT * FROM addresses"
          // "SELECT * FROM addresses WHERE ST_Within(location, ST_Buffer(ST_TRANSFORM(ST_GeomFromText('POINT("+lat+ " "+long+")'), 3857), 4.4))"
          );
        case 5:
          _yield$sequelize$quer = _context4.sent;
          _yield$sequelize$quer2 = (0, _slicedToArray2["default"])(_yield$sequelize$quer, 2);
          results = _yield$sequelize$quer2[0];
          metadata = _yield$sequelize$quer2[1];
          // const nearestLocation = await Address.findAll({
          //     where: {
          //         location: [[sequelize.fn('ST_Distance_Sphere', sequelize.literal('geolocation'), location),'distance']],
          //         // [[sequelize.fn('ST_Distance_Sphere', sequelize.literal('geolocation'), location),'distance']],
          //         order: 'distance', 
          //         limit: 4
          //     }
          // })
          _Responses["default"].setSuccess(200, '', results);
          _Responses["default"].send(res);
          _context4.next = 16;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          next({
            message: _context4.t0.message,
            statusCode: 500
          });
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function nearRestServiceController(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.nearRestServiceController = nearRestServiceController;
//# sourceMappingURL=serviceController.js.map