"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.searchWorkController = exports.getWorkByIdController = exports.getAllWorkController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _models = require("../../dbase/models");
var _constants = require("../constants");
var _Responses = _interopRequireDefault(require("../utils/Responses"));
var _sequelize = require("sequelize");
var getAllWorkController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var allWorks;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _models.Work.findAll();
        case 3:
          allWorks = _context.sent;
          _Responses["default"].setSuccess(201, _constants.GET_ALL_WORKS_SUCCESSFULLY, {
            data: allWorks
          });
          _Responses["default"].send(res);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next({
            message: _constants.constStrings.databaseError,
            statusCode: 500
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function getAllWorkController(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllWorkController = getAllWorkController;
var getWorkByIdController = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var id, work;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return _models.Work.findByPk(id);
        case 4:
          work = _context2.sent;
          _Responses["default"].setSuccess(201, _constants.GET_WORK_SUCCESSFULLY, {
            data: work
          });
          _Responses["default"].send(res);
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          next({
            message: _constants.constStrings.databaseError,
            statusCode: 500
          });
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getWorkByIdController(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getWorkByIdController = getWorkByIdController;
var searchWorkController = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var name, searchedWork;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          name = req.params.name;
          _context3.next = 4;
          return _models.Work.findAll({
            where: {
              name: (0, _defineProperty2["default"])({}, _sequelize.Op.substring, name)
            }
          });
        case 4:
          searchedWork = _context3.sent;
          _Responses["default"].setSuccess(201, _constants.GET_WORK_SUCCESSFULLY, {
            data: searchedWork
          });
          _Responses["default"].send(res);
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          next({
            message: _constants.constStrings.databaseError,
            statusCode: 500
          });
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function searchWorkController(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.searchWorkController = searchWorkController;
//# sourceMappingURL=workController.js.map