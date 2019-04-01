'use strict';

const Controller = require('egg').Controller;

class CaptchasController extends Controller {
  async sms() {
    const data = this.ctx.request.body;
    const { phoneNumber } = data;
    const code = await this.service.accounts.captchas.getByUsername(phoneNumber);
    this.ctx.body = { code };
  }
}

module.exports = CaptchasController;
