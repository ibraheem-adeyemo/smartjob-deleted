"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _jobController = require("../controllers/jobController");
var _helpers = require("../utils/helpers");
var jobRoute = _express["default"].Router();
jobRoute.post('/createAJob', _helpers.uploads.single('imag'), _jobController.createJobController);
jobRoute.get('/getAllJobs/:searchTerm', _jobController.getAllJobsController);
jobRoute.get('/job/id', _jobController.getASingleJobController);
jobRoute.put('/editJob', _jobController.editJobController);
jobRoute["delete"]('/deleteJob/:id', _jobController.deleteJobController);
var _default = jobRoute;
exports["default"] = _default;
//# sourceMappingURL=jobRoute.js.map