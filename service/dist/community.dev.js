"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var community = require('../db/model/community_codes');

var communityActions = require('../db/model/community_actions');

var communityTalks = require('../db/model/community_talks');

var user = require('../db/model/users');

var userService = require('./user');

module.exports = {
  // 获取列表
  getList: function getList(info) {
    var pageSize, pageNum, userId, isCollect, res, res2, list, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, data, len, collectArray;

    return regeneratorRuntime.async(function getList$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pageSize = info.pageSize, pageNum = info.pageNum, userId = info.userId, isCollect = info.isCollect; // 获取所有列表

            _context.next = 3;
            return regeneratorRuntime.awrap(community.findAll());

          case 3:
            res = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(communityActions.findAll({
              where: {
                userId: userId
              }
            }));

          case 6:
            res2 = _context.sent;
            list = res;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 11;
            _iterator = list[Symbol.iterator]();

          case 13:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 23;
              break;
            }

            item = _step.value;
            _context.next = 17;
            return regeneratorRuntime.awrap(user.findOne({
              where: {
                id: item.userId
              }
            }));

          case 17:
            data = _context.sent;
            item.dataValues.userName = data.dataValues.userName;
            item.dataValues.img = data.dataValues.img;

          case 20:
            _iteratorNormalCompletion = true;
            _context.next = 13;
            break;

          case 23:
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](11);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 29:
            _context.prev = 29;
            _context.prev = 30;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 32:
            _context.prev = 32;

            if (!_didIteratorError) {
              _context.next = 35;
              break;
            }

            throw _iteratorError;

          case 35:
            return _context.finish(32);

          case 36:
            return _context.finish(29);

          case 37:
            len = res.length;
            collectArray = [];

            if (res) {
              if (!isCollect) list = res.slice(pageNum * pageSize - pageSize, pageNum * pageSize);

              if (res2.length) {
                list.forEach(function (item, index) {
                  list[index].dataValues.goodActionNumber = 0;
                  list[index].dataValues.collectActionNumber = 0;
                  list[index].dataValues.talkActionNumber = 0;
                  res2.forEach(function (item2, index2) {
                    if (item.id === item2.codeId && parseInt(userId) === item2.userId) {
                      if (item2.type === 0) {
                        list[index].dataValues.goodAction = true;
                        list[index].dataValues.goodActionNumber += 1;
                      }

                      if (item2.type === 1) {
                        if (list[index].dataValues.collectActionArray) {
                          list[index].dataValues.collectAction = true;
                          list[index].dataValues.collectActionNumber += 1;
                          collectArray.push(item);
                        } else {
                          collectArray.push(item);
                          list[index].dataValues.collectActionNumber += 1;
                          list[index].dataValues.collectAction = true;
                        }
                      }

                      if (item2.type === 2) {
                        if (list[index].dataValues.talkAction) {
                          list[index].dataValues.talkAction.push(res2[index2].content);
                          list[index].dataValues.talkActionNumber += 1;
                        } else {
                          list[index].dataValues.talkAction = [res2[index2].content];
                          list[index].dataValues.talkActionNumber += 1;
                        }
                      }
                    }
                  });
                });
              }
            }

            return _context.abrupt("return", {
              status: true,
              data: {
                list: list.reverse(),
                len: len,
                collectArray: collectArray
              }
            });

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[11, 25, 29, 37], [30,, 32, 36]]);
  },
  // 点赞、收藏、回复操作
  doAction: function doAction(info) {
    var userId, codeId, good, collect, talk, talkContent;
    return regeneratorRuntime.async(function doAction$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = info.userId, codeId = info.codeId, good = info.good, collect = info.collect, talk = info.talk, talkContent = info.talkContent;

            if (!(good === "true")) {
              _context2.next = 6;
              break;
            }

            _context2.next = 4;
            return regeneratorRuntime.awrap(communityActions.create({
              userId: userId,
              codeId: codeId,
              type: 0
            }));

          case 4:
            _context2.next = 9;
            break;

          case 6:
            if (!(good === "false")) {
              _context2.next = 9;
              break;
            }

            _context2.next = 9;
            return regeneratorRuntime.awrap(communityActions.destroy({
              where: {
                userId: userId,
                codeId: codeId,
                type: 0
              }
            }));

          case 9:
            if (!(collect === "true")) {
              _context2.next = 14;
              break;
            }

            _context2.next = 12;
            return regeneratorRuntime.awrap(communityActions.create({
              userId: userId,
              codeId: codeId,
              type: 1
            }));

          case 12:
            _context2.next = 17;
            break;

          case 14:
            if (!(collect === "false")) {
              _context2.next = 17;
              break;
            }

            _context2.next = 17;
            return regeneratorRuntime.awrap(communityActions.destroy({
              where: {
                userId: userId,
                codeId: codeId,
                type: 1
              }
            }));

          case 17:
            if (!(talk === "true")) {
              _context2.next = 22;
              break;
            }

            _context2.next = 20;
            return regeneratorRuntime.awrap(communityActions.create({
              userId: userId,
              codeId: codeId,
              type: 2,
              content: talkContent
            }));

          case 20:
            _context2.next = 25;
            break;

          case 22:
            if (!(talk === "false")) {
              _context2.next = 25;
              break;
            }

            _context2.next = 25;
            return regeneratorRuntime.awrap(communityActions.destroy({
              where: {
                userId: userId,
                codeId: codeId,
                talkContent: talkContent,
                type: 2
              }
            }));

          case 25:
            return _context2.abrupt("return", {
              status: true
            });

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  // 获取文章回复
  getTalk: function getTalk(info) {
    var id, data, res, map, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _item;

    return regeneratorRuntime.async(function getTalk$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = info.id;
            _context3.next = 3;
            return regeneratorRuntime.awrap(communityTalks.findAll({
              where: {
                codeId: id
              }
            }));

          case 3:
            data = _context3.sent;
            res = []; // hash表

            map = new Map();
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context3.prev = 9;
            _iterator2 = data[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context3.next = 22;
              break;
            }

            item = _step2.value;

            if (!(item.dataValues.deep === 1)) {
              _context3.next = 19;
              break;
            }

            _context3.next = 16;
            return regeneratorRuntime.awrap(userService.getUserInfo(item.userId));

          case 16:
            item.dataValues.userInfo = _context3.sent;
            res.push(item.dataValues);
            map.set(item.dataValues.id, res.length - 1);

          case 19:
            _iteratorNormalCompletion2 = true;
            _context3.next = 11;
            break;

          case 22:
            _context3.next = 28;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3["catch"](9);
            _didIteratorError2 = true;
            _iteratorError2 = _context3.t0;

          case 28:
            _context3.prev = 28;
            _context3.prev = 29;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 31:
            _context3.prev = 31;

            if (!_didIteratorError2) {
              _context3.next = 34;
              break;
            }

            throw _iteratorError2;

          case 34:
            return _context3.finish(31);

          case 35:
            return _context3.finish(28);

          case 36:
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context3.prev = 39;
            _iterator3 = data[Symbol.iterator]();

          case 41:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context3.next = 60;
              break;
            }

            _item = _step3.value;

            if (!(_item.dataValues.deep === 2)) {
              _context3.next = 57;
              break;
            }

            if (!res[map.get(_item.dataValues.replyToId)].hasOwnProperty('child')) {
              _context3.next = 52;
              break;
            }

            _context3.next = 47;
            return regeneratorRuntime.awrap(userService.getUserInfo(_item.userId));

          case 47:
            _item.dataValues.userInfo = _context3.sent;
            res[map.get(_item.dataValues.replyToId)].child.push(_item.dataValues);
            map.set(_item.dataValues.id, map.get(_item.dataValues.replyToId));
            _context3.next = 57;
            break;

          case 52:
            _context3.next = 54;
            return regeneratorRuntime.awrap(userService.getUserInfo(_item.userId));

          case 54:
            _item.dataValues.userInfo = _context3.sent;
            res[map.get(_item.dataValues.replyToId)].child = [_item.dataValues];
            map.set(_item.dataValues.id, map.get(_item.dataValues.replyToId));

          case 57:
            _iteratorNormalCompletion3 = true;
            _context3.next = 41;
            break;

          case 60:
            _context3.next = 66;
            break;

          case 62:
            _context3.prev = 62;
            _context3.t1 = _context3["catch"](39);
            _didIteratorError3 = true;
            _iteratorError3 = _context3.t1;

          case 66:
            _context3.prev = 66;
            _context3.prev = 67;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 69:
            _context3.prev = 69;

            if (!_didIteratorError3) {
              _context3.next = 72;
              break;
            }

            throw _iteratorError3;

          case 72:
            return _context3.finish(69);

          case 73:
            return _context3.finish(66);

          case 74:
            return _context3.abrupt("return", {
              status: true,
              data: res.reverse()
            });

          case 75:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[9, 24, 28, 36], [29,, 31, 35], [39, 62, 66, 74], [67,, 69, 73]]);
  },
  // 回复文章或回复用户
  doTalk: function doTalk(info) {
    var content, userId, codeId, deep, replyToId;
    return regeneratorRuntime.async(function doTalk$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            content = info.content, userId = info.userId, codeId = info.codeId, deep = info.deep, replyToId = info.replyToId;
            _context4.next = 3;
            return regeneratorRuntime.awrap(communityActions.create({
              userId: userId,
              codeId: codeId,
              type: 2
            }));

          case 3:
            _context4.next = 5;
            return regeneratorRuntime.awrap(communityTalks.create(_objectSpread({}, info)));

          case 5:
            return _context4.abrupt("return", {
              status: true
            });

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  // 分享文章
  shareCode: function shareCode(info) {
    var userId, description, code;
    return regeneratorRuntime.async(function shareCode$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = info.userId, description = info.description, code = info.code;
            _context5.next = 3;
            return regeneratorRuntime.awrap(community.create(_objectSpread({}, info)));

          case 3:
            return _context5.abrupt("return", {
              status: true
            });

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};