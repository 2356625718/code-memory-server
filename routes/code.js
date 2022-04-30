const router = require('koa-router')()
const service = require('../service')

router.prefix('/code')
// 获取code列表
router.get('/getCode', async (ctx, next) => {
  const res = await service.code.getCode(ctx.request.query)
  ctx.body = res
})

router.post('/addCode', async (ctx, next) => {
  const res = await service.code.addCode(ctx.request.body)
  ctx.body = res
})

// 获取用户创建代码片段的日历信息
router.get('/getCreateDate', async (ctx, next) => {
  const res = await service.code.getCreateData(ctx.request.query.userId)
  ctx.body = res
})

module.exports = router
