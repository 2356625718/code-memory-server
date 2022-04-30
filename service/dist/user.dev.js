"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User = require('../db/model/users');

module.exports = {
  // 注册
  addUser: function addUser(info) {
    var userName, phone, isExist, res;
    return regeneratorRuntime.async(function addUser$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userName = info.userName, phone = info.phone;
            _context.next = 3;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                userName: userName
              }
            }));

          case 3:
            isExist = _context.sent;

            if (!isExist) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", {
              status: false,
              data: '用户名重复'
            });

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                phone: phone
              }
            }));

          case 8:
            isExist = _context.sent;

            if (!isExist) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", {
              status: false,
              data: '手机号重复'
            });

          case 11:
            _context.next = 13;
            return regeneratorRuntime.awrap(User.create(_objectSpread({}, info)));

          case 13:
            res = _context.sent;
            return _context.abrupt("return", {
              status: true,
              data: res
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  // 登录
  login: function login(info) {
    var userNameOrPhone, password, res;
    return regeneratorRuntime.async(function login$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userNameOrPhone = info.userNameOrPhone, password = info.password;
            _context2.next = 3;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                username: userNameOrPhone,
                password: password
              }
            }));

          case 3:
            res = _context2.sent;

            if (res) {
              _context2.next = 15;
              break;
            }

            _context2.next = 7;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                phone: userNameOrPhone,
                password: password
              }
            }));

          case 7:
            res = _context2.sent;

            if (res) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", {
              status: false,
              data: '登录失败'
            });

          case 12:
            return _context2.abrupt("return", {
              status: true,
              data: res
            });

          case 13:
            _context2.next = 16;
            break;

          case 15:
            return _context2.abrupt("return", {
              status: true,
              data: res
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  // 获取用户信息
  getUserInfo: function getUserInfo(id) {
    var res;
    return regeneratorRuntime.async(function getUserInfo$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                id: id
              }
            }));

          case 2:
            res = _context3.sent;
            return _context3.abrupt("return", res.dataValues);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  // 更新用户头像
  updateImg: function updateImg(info) {
    var id, img;
    return regeneratorRuntime.async(function updateImg$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = info.id, img = info.img;
            _context4.next = 3;
            return regeneratorRuntime.awrap(User.update({
              img: img
            }, {
              where: {
                id: id
              }
            }));

          case 3:
            return _context4.abrupt("return", {
              status: true
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  }
};