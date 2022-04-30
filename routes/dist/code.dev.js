"use strict";

var router = require('koa-router')();

var service = require('../service');

router.prefix('/code'); // 获取code列表

router.get('/getCode', function _callee(ctx, next) {
  var res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(service.code.getCode(ctx.request.query));

        case 2:
          res = _context.sent;
          ctx.body = res;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/addCode', function _callee2(ctx, next) {
  var res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(service.code.addCode(ctx.request.body));

        case 2:
          res = _context2.sent;
          ctx.body = res;

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 获取用户创建代码片段的日历信息

router.get('/getCreateDate', function _callee3(ctx, next) {
  var res;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(service.code.getCreateData(ctx.request.query.userId));

        case 2:
          res = _context3.sent;
          ctx.body = res;

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;