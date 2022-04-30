const User = require('../db/model/users')

module.exports = {
  // 注册
  addUser: async (info) => {
    let { userName, phone } = info
    let isExist = await User.findOne({
      where: {
        userName
      }
    })
    if (isExist) return {
      status: false,
      data: '用户名重复'
    }
    isExist = await User.findOne({
      where: {
        phone
      }
    })
    if (isExist) return {
      status: false,
      data: '手机号重复'
    }
    const res = await User.create({
      ...info,
    })
    return {
      status: true,
      data: res
    }
  },
  // 登录
  login: async (info) => {
    const {
      userNameOrPhone,
      password
    } = info
    let res = await User.findOne({
      where: {
        username: userNameOrPhone,
        password
      }
    })
    if (!res) {
      res = await User.findOne({
        where: {
          phone: userNameOrPhone,
          password
        }
      })
      if (!res) return {
        status: false,
        data: '登录失败'
      }
      else return {
        status: true,
        data: res
      }
    } else {
      return {
        status: true,
        data: res
      }
    }
  },
  // 获取用户信息
  getUserInfo: async (id) => {
    let res = await User.findOne({
      where: {
        id
      }
    })
    return res.dataValues
  },
  // 更新用户头像
  updateImg: async (info) => {
    const { id, img } = info
    await User.update({
      img,
    }, {
      where: {
        id
      }
    })
    return {
      status: true
    }
  },
}