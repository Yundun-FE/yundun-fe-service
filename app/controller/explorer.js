'use strict';

const Controller = require('egg').Controller;

class ExplorerController extends Controller {
  async job() {
    const { name } = this.ctx.params;
    const { env } = this.ctx.query;

    const res = await this.ctx.service.jobs.getByCodeEnv(name, env);
    const data = {
      title: res.title,
      menus: res.menus,
      assets: res.assets,
    };

    this.ctx.body = data;
  }

  async page() {
    const { code } = this.ctx.params;
    const { env } = this.ctx.query;
    this.ctx.body = await this.ctx.service.applicationsPages.getByCodeEnv(code, env);
  }

  async assets() {
    const { code } = this.ctx.params;
    this.ctx.body = await this.ctx.service.agent.getByCode(code);
  }
}

module.exports = ExplorerController;
