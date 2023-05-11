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
var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _nodeNotifier = _interopRequireDefault(require("node-notifier"));
var _Responses = _interopRequireDefault(require("./utils/Responses"));
var _userRoute = _interopRequireDefault(require("./routes/userRoute"));
var _jobRoute = _interopRequireDefault(require("./routes/jobRoute"));
var _console = require("console");
var _database = _interopRequireDefault(require("./utils/database"));
var _serviceRoute = _interopRequireDefault(require("./routes/serviceRoute"));
var _errorHandlers = require("./middlewares/errorHandlers");
var _workRoute = _interopRequireDefault(require("./routes/workRoute"));
var _addressRoute = _interopRequireDefault(require("./routes/addressRoute"));
require('dotenv').config();

// import errorHandler from 'errorhandler';

var app = (0, _express["default"])();
var isProduction = process.env.NODE_ENV === 'production';
app.use((0, _cors["default"])());

// Express configuration
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());

// Express multer configuration for the file upload

var errorNotification = function errorNotification(err, str, req) {
  var _context;
  var title = (0, _concat["default"])(_context = "Error in ".concat(req.method, " ")).call(_context, req.url);
  _nodeNotifier["default"].notify({
    title: title,
    msg: str
  });
};
if (!isProduction) {
  // app.use(errorHandler({log:errorNotification}))
  app.use((0, _morgan["default"])('dev'));
}
var apiVersion = '/api/v1';
app.use(apiVersion, _userRoute["default"]);
app.use(apiVersion, _jobRoute["default"]);
app.use(apiVersion, _serviceRoute["default"]);
app.use(apiVersion, _workRoute["default"]);
app.use(apiVersion, _addressRoute["default"]);
app.get('/', function (req, res) {
  _Responses["default"].setSuccess(200, 'Welcome to your smart job portal');
  _Responses["default"].send(res);
});
app.all('/*', function (req, res) {
  _Responses["default"].setError(404, 'The requested url was not found on this server');
  _Responses["default"].send(res);
});
app.use(function (err, req, res, next) {
  var statusCode = err.statusCode ? err.statusCode : 500;
  console.log(JSON.parse((0, _stringify["default"])(err)));
  res.status(statusCode).json({
    err: err
  });
});
if (!isProduction) {
  app.use(function (err, req, res) {
    (0, _console.debug)(err.stack);
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
        error: err
      }
    });
  });
}
var sync = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _database["default"].sync();
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee);
  }));
  return function sync() {
    return _ref.apply(this, arguments);
  };
}();
sync();
var server = app.listen(process.env.PORT || 8080, "0.0.0.0", function () {
  (0, _console.debug)("Listen on port ".concat(server.address().port));
});
var _default = server;
exports["default"] = _default;
//# sourceMappingURL=index.js.map