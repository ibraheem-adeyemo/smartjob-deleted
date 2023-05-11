"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllJobsController = exports.getASingleJobController = exports.editJobController = exports.deleteJobController = exports.createJobController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _Responses = _interopRequireDefault(require("../utils/Responses"));
var _jobServices = require("../services/jobServices");
var createJobController = function createJobController(req, res) {
  var reqBody = req.body;
  reqBody.images = req.file;
  // const reqImg = req

  console.log(reqBody, req.file);
  // createAJobService(reqBody);
  _Responses["default"].setSuccess(200, 'you just created a job');
  _Responses["default"].send(res);
};
exports.createJobController = createJobController;
var getAllJobsController = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var allJobs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _jobServices.getAllJobsService)();
        case 3:
          allJobs = _context.sent;
          console.log(allJobs);
          _Responses["default"].setSuccess(200, 'endpoint to get all jobs');
          _Responses["default"].send(res);
          _context.next = 14;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          _Responses["default"].setError(500, 'error from the data base');
          _Responses["default"].send(res);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getAllJobsController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllJobsController = getAllJobsController;
var editJobController = function editJobController(req, res) {
  _Responses["default"].setSuccess(200, 'endpoint to edit a single job');
  _Responses["default"].send(res);
};
exports.editJobController = editJobController;
var deleteJobController = function deleteJobController(req, res) {
  _Responses["default"].setSuccess(200, 'endpoint to delete a single job');
  _Responses["default"].send(res);
};
exports.deleteJobController = deleteJobController;
var getASingleJobController = function getASingleJobController(req, res) {
  _Responses["default"].setSuccess(200, 'endpoint to delete a single job');
  _Responses["default"].send(res);
};
exports.getASingleJobController = getASingleJobController;
//# sourceMappingURL=jobController.js.map