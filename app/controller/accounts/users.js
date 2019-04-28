'use strict';

const crypto = require('crypto');
const Controller = require('egg').Controller;
const uuidv1 = require('uuid/v1');
const Rule = require('../../utils/rule');

const rules = {
  email: {
    type: 'email',
    required: false,
    message: '邮箱格式不正确',
  },
  phoneNumber: {
    type: 'regexp',
    pattern: Rule.mobile,
    required: false,
    message: '手机格式不正确',
  },
  password: {
    type: 'string',
    required: true,
    message: '请填写密码',
  },
};

class AccountsController extends Controller {
  async info() {
    const { userId } = this.ctx.state.user;
    const data = await this.ctx.service.accounts.users.findById(userId);
    this.ctx.body = this.ctx.service.accounts.users.formatResult(data);
  }

  async update() {
    const { avatar, tz, language } = this.ctx.request.body;
    const { userId } = this.ctx.state.user;
    const update = {
      avatar,
      tz,
      language,
    };
    this.ctx.body = await this.ctx.service.accounts.users.updateById(update, userId);
  }

  async login() {
    const rule = {
      username: {
        type: 'string',
        required: true,
        message: '请填写用户名',
      },
      password: {
        type: 'string',
        required: true,
        message: '请填写密码',
      },
    };
    await this.ctx.validate(rule, this.ctx.request.body);

    const { username, password } = this.ctx.request.body;
    const form = {
      username,
      password,
    };
    this.ctx.body = await this.service.accounts.users.login(form);
  }

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
