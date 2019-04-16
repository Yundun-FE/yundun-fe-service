'use strict';

const Controller = require('egg').Controller;

class ExplorerController extends Controller {
  async job() {
    const { name, env: envParams } = this.ctx.params;
    const { env: envQuery } = this.ctx.query;
    const env = envParams || envQuery;

    const res = await this.ctx.service.jobs.getByCodeEnv(name, env);
    const data = {
      env,
      title: res.title,
      menus: res.menus,
      assets: res.assets,
      proxy: res.proxy,
      options: res.options,
      url: res.url,
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
