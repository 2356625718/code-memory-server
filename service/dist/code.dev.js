"use strict";

var Code = require('../db/model/codes');

var moment = require('moment');

module.exports = {
  // 根据id查询代码片段
  getCode: function getCode(info) {
    var res;
    return regeneratorRuntime.async(function getCode$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Code.findAll({
              where: {
                userId: info.userId
              }
            }));

          case 2:
            res = _context.sent;
            return _context.abrupt("return", {
              status: true,
              data: res.reverse()
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  // 根据id存储代码片段
  addCode: function addCode(info) {
    var userId, codes, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, res;

    return regeneratorRuntime.async(function addCode$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = info.userId, codes = info.codes;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 4;
            _iterator = codes[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 17;
              break;
            }

            item = _step.value;
            _context2.next = 10;
            return regeneratorRuntime.awrap(Code.findAll({
              where: {
                id: item.id
              }
            }));

          case 10:
            res = _context2.sent;

            if (res.length) {
              _context2.next = 14;
              break;
            }

            _context2.next = 14;
            return regeneratorRuntime.awrap(Code.create({
              id: item.id,
              userId: userId,
              title: item.title,
              description: item.description,
              content: item.code
            }));

          case 14:
            _iteratorNormalCompletion = true;
            _context2.next = 6;
            break;

          case 17:
            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 23:
            _context2.prev = 23;
            _context2.prev = 24;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 26:
            _context2.prev = 26;

            if (!_didIteratorError) {
              _context2.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context2.finish(26);

          case 30:
            return _context2.finish(23);

          case 31:
            return _context2.abrupt("return", {
              status: true
            });

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[4, 19, 23, 31], [24,, 26, 30]]);
  },
  // 获取用户创建代码片段的日历信息
  getCreateData: function getCreateData(id) {
    var res, start, end, dayTime, data, map, time, now, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, _now;

    return regeneratorRuntime.async(function getCreateData$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(Code.findAll({
              where: {
                userId: id
              }
            }));

          case 2:
            res = _context3.sent;
            start = moment(new Date()).startOf('year').valueOf();
            end = moment(new Date()).endOf('year').valueOf();
            dayTime = 3600 * 24 * 1000;
            data = [];
            map = new Map();

            for (time = start; time < end; time += dayTime) {
              now = moment(time).format('yyyy-MM-DD');
              data.push([now, 0]);
              map.set(now, data.length - 1);
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context3.prev = 12;

            for (_iterator2 = res[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              item = _step2.value;
              _now = moment(item.dataValues.createdAt).format('yyyy-MM-DD');
              data[map.get(_now)][1] += 1;
            }

            _context3.next = 20;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](12);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t0;

          case 20:
            _context3.prev = 20;
            _context3.prev = 21;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 23:
            _context3.prev = 23;

            if (!_didIteratorError2) {
              _context3.next = 26;
              break;
            }

            throw _iteratorError2;

          case 26:
            return _context3.finish(23);

          case 27:
            return _context3.finish(20);

          case 28:
            return _context3.abrupt("return", {
              status: true,
              data: data
            });

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[12, 16, 20, 28], [21,, 23, 27]]);
  }
};