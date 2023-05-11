"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
var _constants = require("../constants");
/**
 * @class Responses
 * @description A utility class to handle responses
 * @exports Responses
 * */
var Responses = /*#__PURE__*/function () {
  function Responses() {
    (0, _classCallCheck2["default"])(this, Responses);
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  /**
   * @method setSuccess
   * @description Set success responses
   * @static
   * @param {object} statusCode
   * @param {object} message
   * @param {object} data
   * @returns {undefined}
   * @memberof Responses
   */
  (0, _createClass2["default"])(Responses, null, [{
    key: "setSuccess",
    value: function setSuccess(statusCode, message) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.type = _constants.statusTitles.success;
    }

    /**
    * @method setError
    * @description Set error responses
    * @static
    * @param {object} statusCode
    * @param {object} message
    * @returns {undefined}
    * @memberof Responses
    * */
  }, {
    key: "setError",
    value: function setError(statusCode, msg) {
      console.log(msg);
      this.statusCode = statusCode;
      this.message = msg;
      this.type = _constants.statusTitles.error;
    }

    /**
    * @method send
    * @description Sends response messages
    * @static
    * @param {object} res - Response object
    * @returns {object} JSON response
    * @memberof Responses
    */
  }, {
    key: "send",
    value: function send(res) {
      var result = {
        status: this.type,
        data: this.data,
        message: this.message
      };
      var output = res.status(this.statusCode);
      var response = this.type === 'success' ? output.json(result) : output.json({
        status: this.type,
        message: this.message
      });
      return response;
    }
  }]);
  return Responses;
}();
exports["default"] = Responses;
//# sourceMappingURL=Responses.js.map