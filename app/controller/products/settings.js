'use strict';

const Controller = require('egg').Controller;

class SettingsController extends Controller {
  async index() {
    this.ctx.body = 1;
  }
}

module.exports = SettingsController;
