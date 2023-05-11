"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _workController = require("../controllers/workController");
var _authMiddleware = require("../middlewares/authMiddleware");
var workRoute = _express["default"].Router();

// get all work route
workRoute.get('/works/allWorks', _authMiddleware.isAuthenticated, _workController.getAllWorkController);
workRoute.get('/works/:id', _authMiddleware.isAuthenticated, _workController.getWorkByIdController);
workRoute.get('/works/search/:name', _workController.searchWorkController);
var _default = workRoute;
exports["default"] = _default;
//# sourceMappingURL=workRoute.js.map