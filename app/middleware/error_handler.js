'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      const { message, code = 1, errors } = err;
      const data = {
        message,
        code,
        errors,
      };
      ctx.status = 400;
      ctx.body = data;
      return;
    }

    if (ctx.status === 404 && !ctx.body) {
      ctx.body = { message: '没有此接口', code: 404 };
    }
  };
};
