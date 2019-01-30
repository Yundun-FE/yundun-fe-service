'use strict';

const Controller = require('egg').Controller;

/*

GET /apps/:appid/pages/:pagesid
{
  env: 'test'
  agent: 'oem'
  blocks: ['sd','sd','ds']
}

{
  page: {},
  blocks: {
    a: {

    }
  }
}

GET /apps/:appid
{
  env: 'test',
  agent: 'ds'
}

GET /apps/
*/

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
