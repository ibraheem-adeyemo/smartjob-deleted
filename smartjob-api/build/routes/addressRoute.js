"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _addressController = require("../controllers/addressController");
var _authMiddleware = require("../middlewares/authMiddleware");
var addressRoute = _express["default"].Router();
addressRoute.post('/addresses/create-address', _authMiddleware.isAuthenticated, _addressController.createAddressController);
addressRoute.get('/addresses/nearest-services', _authMiddleware.isAuthenticated, _addressController.getNearestAddressController);
addressRoute.put('/addresses/update-address', _authMiddleware.isAuthenticated, _addressController.updateAddressController);
var _default = addressRoute;
exports["default"] = _default;
//# sourceMappingURL=addressRoute.js.map