"use strict";

var router = require('koa-router')();

var service = require('../service');

router.prefix('/user'); //登录

router.post('/login', function _callee(ctx, next) {
  var res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(service.user.login(ctx.request.body));

        case 2:
          res = _context.sent;
          ctx.body = res;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); //注册

router.post('/register', function _callee2(ctx, next) {
  var res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(service.user.addUser(ctx.request.body));

        case 2:
          res = _context2.sent;
          ctx.body = res;

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 更新用户头像

router.post('/updateImg', function _callee3(ctx, next) {
  var res;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(service.user.updateImg(ctx.request.body));

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