'use strict';

const Controller = require('egg').Controller;

class JobsController extends Controller {
  async number() {
    const paramsRules = {
      name: { type: 'string', required: true },
      number: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);
    const { name, number } = this.ctx.params;


  }
}

module.exports = JobsController;
