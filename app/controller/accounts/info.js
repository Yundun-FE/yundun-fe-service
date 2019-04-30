'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const { createHash } = require('../../utils/hash');

class InfoController extends Controller {
  async avatar() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const filename = `avatar/${Date.now()}_${createHash(5)}`;

    let result;
    try {
      result = await ctx.service.upload.uploadCdn(file.filepath, filename);
    } finally {
      await ctx.cleanupRequestFiles();
    }

    const { userId } = this.ctx.state.user;
    const update = {
      avatar: result.url,
    };
    this.ctx.body = await this.ctx.service.accounts.users.updateById(update, userId);
    // ctx.body = {
    //   ...result,
    //   requestBody: ctx.request.body,
    // };
  }
}

module.exports = InfoController;
