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
      ctx.body = data;
      return;
    }

    if (ctx.status === 404 && !ctx.body) {
      ctx.body = { message: 'Not Api', code: 404 };
    }
  };
};
