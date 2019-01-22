'use strict';

const Controller = require('egg').Controller;

class ExplorerController extends Controller {
  async page() {
    const { code } = this.ctx.params;
    const { agent } = this.ctx.query;
    this.ctx.body = await this.ctx.service.appPage.getByCode(code, agent);
  }
}

module.exports = ExplorerController;
