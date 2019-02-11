'use strict';

const Controller = require('egg').Controller;

class ExplorerController extends Controller {
  async page() {
    const { code } = this.ctx.params;
    const { env } = this.ctx.query;
    console.log(code);
    this.ctx.body = await this.ctx.service.applicationsPages.getByCodeEnv(code, env);
  }

  async assets() {
    const { code } = this.ctx.params;
    this.ctx.body = await this.ctx.service.agent.getByCode(code);
  }
}

module.exports = ExplorerController;
