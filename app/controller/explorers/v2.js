'use strict';

const Controller = require('egg').Controller;

class V2Controller extends Controller {
  async job() {
    const paramsRules = {
      env: { type: 'string', required: true },
      productName: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);
    const { env, productName } = this.ctx.params;

    const name = `${productName}/${env}`;
    this.ctx.body = await this.ctx.service.jobs.deploys.findByName(name);
  }

  async jobHash() {
    const paramsRules = {
      env: { type: 'string', required: true },
      productName: { type: 'string', required: true },
      hash: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);
    const { hash } = this.ctx.params;
    this.ctx.body = await this.ctx.service.jobs.deploys.findByHash(hash);
  }

  async jobNumber() {
    const paramsRules = {
      env: { type: 'string', required: true },
      productName: { type: 'string', required: true },
      number: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);
    const { productName, env, number } = this.ctx.params;
    const jobName = `${productName}/${env}`;
    this.ctx.body = await this.ctx.service.jobs.deploys.findByNumber(jobName, number);
  }
}

module.exports = V2Controller;
