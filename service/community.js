const community = require('../db/model/community_codes')
const communityActions = require('../db/model/community_actions')
const communityTalks = require('../db/model/community_talks')
const code = require('../db/model/codes')
const userService = require('./user')

module.exports = {
  // 获取列表
  getList: async (info) => {
    const {
      pageSize,
      pageNum,
      userId,
      isCollect
    } = info
    // 获取所有列表
    const res = await community.findAll()
    const res2 = await communityActions.findAll({
      where: {
        userId
      }
    })
    let list = res
    let len = res.length
    let collectArray = []
    if (res) {
      if (!isCollect) list = res.slice(pageNum * pageSize - pageSize, pageNum * pageSize)
      if (res2.length) {
        list.forEach((item, index) => {
          list[index].dataValues.goodActionNumber = 0
          list[index].dataValues.collectActionNumber = 0
          list[index].dataValues.talkActionNumber = 0
          res2.forEach((item2, index2) => {
            if (item.id === item2.codeId && parseInt(userId) === item2.userId) {
              if (item2.type === 0) {
                list[index].dataValues.goodAction = true
                list[index].dataValues.goodActionNumber += 1
              }
              if (item2.type === 1) {
                if (list[index].dataValues.collectActionArray) {
                  list[index].dataValues.collectAction = true
                  list[index].dataValues.collectActionNumber += 1
                  collectArray.push(item)
                } else {
                  collectArray.push(item)
                  list[index].dataValues.collectActionNumber += 1
                  list[index].dataValues.collectAction = true
                }
              }
              if (item2.type === 2) {
                if (list[index].dataValues.talkAction) {
                  list[index].dataValues.talkAction.push(res2[index2].content)
                  list[index].dataValues.collectActionNumber += 1
                } else {
                  list[index].dataValues.talkAction = [res2[index2].content]
                  list[index].dataValues.collectActionNumber += 1
                }
              }
            }
          })
        })
      }
    }
    return {
      status: true,
      data: {
        list,
        len,
        collectArray
      }
    }
  },

  // 点赞、收藏、回复操作
  doAction: async (info) => {
    const {
      userId,
      codeId,
      good,
      collect,
      talk,
      talkContent
    } = info
    if (good === "true") {
      await communityActions.create({
        userId,
        codeId,
        type: 0
      })
    } else if (good === "false") {
      await communityActions.destroy({
        where: {
          userId,
          codeId,
          type: 0
        }
      })
    }
    if (collect === "true") {
      await communityActions.create({
        userId,
        codeId,
        type: 1
      })
    } else if (collect === "false") {
      await communityActions.destroy({
        where: {
          userId,
          codeId,
          type: 1
        }
      })
    }
    if (talk === "true") {
      await communityActions.create({
        userId,
        codeId,
        type: 2,
        content: talkContent
      })
    } else if (talk === "false") {
      await communityActions.destroy({
        where: {
          userId,
          codeId,
          talkContent,
          type: 2
        }
      })
    }
    return {
      status: true,
    }
  },

  // 获取文章回复
  getTalk: async (info) => {
    const { id } = info
    let data = await communityTalks.findAll({
      where: {
        codeId: id
      }
    })
    let res = []
    let map = new Map()
    for (let item of data) {
      if (item.dataValues.deep === 1) {
        item.dataValues.userInfo = await userService.getUserInfo(item.userId)
        res.push(item.dataValues)
        map.set(item.dataValues.id, res.length - 1)
      }
    }
    for (let item of data) {
      if (item.dataValues.deep === 2) {
        if (res[map.get(item.dataValues.replyToId)].hasOwnProperty('child')) {
          item.dataValues.userInfo = await userService.getUserInfo(item.userId)
          res[map.get(item.dataValues.replyToId)].child.push(item.dataValues)
          map.set(item.dataValues.id, map.get(item.dataValues.replyToId))
        } else {
          item.dataValues.userInfo = await userService.getUserInfo(item.userId)
          res[map.get(item.dataValues.replyToId)].child = [item.dataValues]
          map.set(item.dataValues.id, map.get(item.dataValues.replyToId))
        }
      }
    }
    return {
      status: true,
      data: res
    }
  },

  // 回复文章或回复用户
  doTalk: async (info) => {
    const { content, userId, codeId, deep, replyToId } = info
    await communityTalks.create({
      ...info
    })
    return {
      status: true
    }
  },

  // 分享文章
  shareCode: async (info) => {
    const { userId, title, content, introduce } = info
    await code.create({
      ...info
    })
    return {
      status: true
    }
  }
}