const router = require('koa-router')()
const service = require('../service')

router.prefix('/community')
// 获取列表
router.get('/list', async (ctx, next) => {
  const res = await service.community.getList(ctx.request.query)
  ctx.body = res
})

// 点赞、收藏、回复接口
router.get('/action', async (ctx, next) => {
  const res = await service.community.doAction(ctx.request.query)
  ctx.body = res
})

// 获取文章回复
router.get('/talk', async (ctx, next) => {
  const res = await service.community.getTalk(ctx.request.query)
  ctx.body = res
})

// 文章回复
router.get('/doTalk', async (ctx, next) => {
  const res = await service.community.doTalk(ctx.request.query)
  ctx.body = res
})

// 分享代码片段
router.post('/share', async (ctx, next) => {
  const res = await service.community.shareCode(ctx.request.body)
  ctx.body = res
})



module.exports = router
