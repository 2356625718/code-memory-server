const Code = require('../db/model/codes')

module.exports = {
  // 根据id查询文章 
  getCode: async (info) => {
    let res = await Code.findAll({
      where: {
        userId: info.userId
      }
    })
    return {
      status: true,
      data: res
    }
  }
}