'use strict';

const Controller = require('egg').Controller;

class ExplorerController extends Controller {
  async page() {
    const { code } = this.ctx.params;
    const { agent } = this.ctx.query;
    this.ctx.body = await this.ctx.service.applicationsPages.getByCode(code, agent);
  }

  async assets() {
    const { code } = this.ctx.params;
    this.ctx.body = await this.ctx.service.agent.getByCode(code);
  }
}

module.exports = ExplorerController;
