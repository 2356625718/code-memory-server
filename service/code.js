const Code = require('../db/model/codes')
const moment = require('moment')

module.exports = {
  // 根据id查询代码片段
  getCode: async (info) => {
    let res = await Code.findAll({
      where: {
        userId: info.userId
      }
    })
    return {
      status: true,
      data: res.reverse()
    }
  },

  // 根据id存储代码片段
  addCode: async (info) => {
    const { userId, codes } = info
    // 删除所有
    if(!codes.length) {
      let res = await Code.findAll({
        where: {
         userId
        }
      })
      if (res.length) {
        await Code.destroy({
          where: {
            userId: userId
          }
        })
      }
    } else {
      // 存储替换
      await Code.destroy({
        where: {
          userId: userId
        }
      })
      for (let item of codes) {
        let res = await Code.findAll({
          where: {
            id: item.id
          }
        })
        if (!res.length) {
          await Code.create({
            id: item.id,
            userId,
            title: item.title,
            description: item.description,
            content: item.code,
          })
        } else {
          await Code.update({
            title: item.title,
            description: item.description,
            content: item.code,
          }, {
            where: {
              id: item.id
            }
          })
        }
      }
    }
    return {
      status: true,
    }
  },
  // 获取用户创建代码片段的日历信息
  getCreateData: async (id) => {
    let res = await Code.findAll({
      where: {
        userId: id
      }
    })
    // 年开始ms
    const start = moment(new Date()).startOf('year').valueOf()
    // 年结束ms
    const end = moment(new Date()).endOf('year').valueOf()
    // 一天ms数
    let dayTime = 3600 * 24 * 1000;
    let data = []
    let map = new Map()
    // 形成年度列表
    for (let time = start; time < end; time += dayTime) {
      let now = moment(time).format('yyyy-MM-DD')
      data.push([
        now,
        0,
      ]);
      map.set(now, data.length - 1)
    }
    // 将数据填充入列表，通过hash表节约时间复杂度
    for (let item of res) {
      let now = moment(item.dataValues.createdAt).format('yyyy-MM-DD')
      data[map.get(now)][1] += 1
    }
    return {
      status: true,
      data
    }
  }
}