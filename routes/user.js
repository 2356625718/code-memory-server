const router = require('koa-router')()
const service = require('../service')

router.prefix('/user')
//登录
router.post('/login', async (ctx, next) => {
  const res = await service.user.login(ctx.request.body)
  ctx.body = res
})
//注册
router.post('/register', async (ctx, next) => {
  const res = await service.user.addUser(ctx.request.body)
  ctx.body = res
})

module.exports = router
