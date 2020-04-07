const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error.errorCode) {
      // 自定义已知类型的错误处理
      ctx.status = error.code
      ctx.body = {
        message: error.message,
        errorCode: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
    } else {
      // 未知型的错误处理
      ctx.status = 500
      ctx.body = {
        msg: 'we made a mistake O(∩_∩)O~~',
        request: `${ctx.method} ${ctx.path}`
      }
    }
  }
}

module.exports = catchError
