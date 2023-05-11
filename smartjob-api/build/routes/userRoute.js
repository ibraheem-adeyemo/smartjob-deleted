"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController");
var _authMiddleware = require("../middlewares/authMiddleware");
var userRoute = _express["default"].Router();
userRoute.post('/users/createAccount', _authMiddleware.isUserExist, _userController.signupController);
userRoute.post('/users/login', _authMiddleware.isEmailVerified, _userController.loginController);
userRoute.post('/users/forgetPassword', _userController.forgetPasswordController);
userRoute.post('/users/resetPassword/:id/:token', _userController.resetPasswordController);
userRoute.get('/users/resendEmailVerificationLink', _userController.resendVerificationLinkController);
userRoute.get('/users/verifyUser', _userController.verifyUserController);
userRoute.post('/users/verifyEmailOtp', _authMiddleware.isAuthenticated, _userController.verifyOTPController);
userRoute.post('/users/registerPhoneNumber', _authMiddleware.isAuthenticated, _authMiddleware.isPhoneNumberAlreadyExist, _userController.registerPhoneNumberController);
userRoute.post('/users/verifyPhone', _authMiddleware.isAuthenticated, _userController.verifyPhoneController);
userRoute.post('/users/resendEmailVerificationOTP', _userController.resendEmailVerificationOTP);
var _default = userRoute;
exports["default"] = _default;
//# sourceMappingURL=userRoute.js.map