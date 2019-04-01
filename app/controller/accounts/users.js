'use strict';

const crypto = require('crypto');
const Controller = require('egg').Controller;

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

    const { code, phoneNumber } = form;
    await this.service.accounts.captchas.checkByUsername({ username: phoneNumber, code });
    const password = crypto.createHmac('sha256', this.app.config.keys).update(form.password).digest('hex');
  }
}

module.exports = AccountsController;
