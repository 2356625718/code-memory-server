const router = require('koa-router')()
const service = require('../service')

router.prefix('/code')
// 获取code列表
router.get('/getCode', async (ctx, next) => {
  const res = await service.code.getCode(ctx.request.query)
  ctx.body = res
})

module.exports = router
