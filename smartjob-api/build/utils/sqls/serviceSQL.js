"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.getNearestServiceSql = void 0;
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var getNearestServiceSql = function getNearestServiceSql(workId, latitude, longitude) {
  var _context, _context2;
  return (0, _concat["default"])(_context = (0, _concat["default"])(_context2 = "SELECT * FROM addresses AS ad INNER JOIN services AS s ON s.location=ad.id WHERE ST_Within(ST_TRANSFORM(ST_SRID(ad.location, 4326), 3857), ST_Buffer(\n        ST_TRANSFORM(\n        ST_PointFromText('POINT(".concat(latitude, " ")).call(_context2, longitude, ")', 4326)\n        , 3857), 15000)) AND workId=")).call(_context, workId, ";");
};
exports.getNearestServiceSql = getNearestServiceSql;
//# sourceMappingURL=serviceSQL.js.map