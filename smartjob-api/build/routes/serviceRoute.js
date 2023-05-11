"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _serviceController = require("../controllers/serviceController");
var _helpers = require("../utils/helpers");
var _authMiddleware = require("../middlewares/authMiddleware");
var serviceRoute = _express["default"].Router();
serviceRoute.post('/services/createAService', _authMiddleware.isAuthenticated, _helpers.uploads.single('banners'), _serviceController.createServiceController);
serviceRoute.get('/services/allJServices', _serviceController.getAllServicesController);
serviceRoute.get('/services/aService/:id', _serviceController.createServiceController);
serviceRoute.put('/services/updateService', _authMiddleware.isAuthenticated, _helpers.uploads.single('banners'), _serviceController.updateServiceController);
serviceRoute["delete"]('/services/deleteAService/:id', _serviceController.deleteServiceController);
serviceRoute.get('/services/nearest-services', _serviceController.nearRestServiceController);
var _default = serviceRoute;
exports["default"] = _default;
//# sourceMappingURL=serviceRoute.js.map