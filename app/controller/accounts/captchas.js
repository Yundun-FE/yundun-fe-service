'use strict';

const Controller = require('egg').Controller;

class CaptchasController extends Controller {
  async sms() {
    const { phoneNumber, mobile } = this.ctx.request.body;
    const code = await this.service.accounts.captchas.getByUsername(mobile || phoneNumber);
    this.ctx.body = { code };
  }
}

module.exports = CaptchasController;
