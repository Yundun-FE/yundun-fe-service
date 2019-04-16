'use strict';

const Controller = require('egg').Controller;

class GitController extends Controller {
  async hook() {
    const data = this.ctx.request.body;
    const userinfo = {
      userName: data.user_name,
      email: data.user_email,
      avatar: data.user_avatar,
    };

    const repository = {
      name: data.repository.name,
      url: data.repository.url,
    };

    const create = {
      userinfo,
      repository,
    };

    this.ctx.body = create;
  }
}

module.exports = GitController;
