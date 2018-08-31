module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next()
    } catch (err) {
      ctx.body = err
      return
    }

    if (ctx.status === 404 && !ctx.body) {
      ctx.body = { massage: 'Not Api', code: 404 }
    }
  }
}
