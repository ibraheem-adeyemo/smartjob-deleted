"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _sequelize = require("sequelize");
var _console = require("console");
var _context, _context2, _context3, _context4;
// const sequelize = new Sequelize('sql7603424', 'sql7603424', 'D5FyPRGU1b', {
//     host:'sql7.freesqldatabase.com',
//     dialect: 'mysql'
// });
var dbPassword = process.env.DB_PASSWORD;
var dbHost = process.env.DB_HOST;
var dbPort = process.env.DB_PORT;
var dbName = process.env.DB_NAME;
var dbUser = process.env.DB_USER;

// const dbPswd = process.env.DB_PASSWORD
// const dbHost = process.env.DB_HOST
// const dbName = process.env.DB_NAME
// const dbUser = process.env.DB_USER
// const dbDialect = process.env.DB_DIALECT

// // console.log(host,pswd)
// let sequelize = new Sequelize(dbName, dbUser, dbPassword, {
//     host:dbHost,
//     dialect: 'postgres'
// });

var sequelize = new _sequelize.Sequelize((0, _concat["default"])(_context = (0, _concat["default"])(_context2 = (0, _concat["default"])(_context3 = (0, _concat["default"])(_context4 = "postgres://".concat(dbUser, ":")).call(_context4, dbPassword, "@")).call(_context3, dbHost, ":")).call(_context2, dbPort, "/")).call(_context, dbName));

// const sequelize = new Sequelize(process.env.POSTGRES_URL)

var checkConnection = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return sequelize.authenticate();
        case 3:
          (0, _console.debug)("DB connected successfully");
          _context5.next = 9;
          break;
        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          (0, _console.debug)('Unable to connect to the DB');
        case 9:
        case "end":
          return _context5.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return function checkConnection() {
    return _ref.apply(this, arguments);
  };
}();
checkConnection();
var _default = sequelize;
exports["default"] = _default;
//# sourceMappingURL=database.js.map