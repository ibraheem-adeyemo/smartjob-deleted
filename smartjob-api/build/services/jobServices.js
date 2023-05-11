"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllJobsService = exports.createAJobService = void 0;
var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));
var _models = _interopRequireDefault(require("../../dbase/models"));
var Job = _models["default"].Job;
var createAJobService = function createAJobService(job) {
  console.log(job.toJson());
  //return Job.create(job)
};
exports.createAJobService = createAJobService;
var getAllJobsService = function getAllJobsService() {
  return (0, _find["default"])(Job).call(Job);
};
exports.getAllJobsService = getAllJobsService;
//# sourceMappingURL=jobServices.js.map