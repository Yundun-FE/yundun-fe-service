'use strict';

const crypto = require('crypto');
const Controller = require('egg').Controller;
const uuidv1 = require('uuid/v1');

const rules = {
  email: {
    type: 'email',
    required: true,
    message: '邮箱格式不正确',
  },
  password: {
    type: 'string',
    required: true,
    message: '请填写密码',
  },
};

class AccountsController extends Controller {
  async register() {
    const form = this.ctx.request.body;
    await this.ctx.validate(rules, form);

    const { code, phoneNumber, email } = form;
    // await this.service.accounts.captchas.checkByUsername({ username: phoneNumber, code });
    const password = crypto.createHmac('sha256', this.app.config.keys).update(form.password).digest('hex');

    const registerIP = this.ctx.request.headers.host;
    const createData = {
      phoneNumber,
      email,
      password,
      tz: 'Asia/Shanghai',
      language: 'zh-CN',
      disabled: false,
      devloper: false,
      registerIP,
      userId: uuidv1(),
    };
    this.ctx.body = await this.service.accounts.users.register(createData);
  }
}

module.exports = AccountsController;
