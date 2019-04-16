'use strict';

const Controller = require('egg').Controller;


class DeploysController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Jobs;
    this.Service = ctx.service.jobs.deploys;
  }

  async create() {
    const paramsRules = {
      jobId: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);
    const { jobId } = this.ctx.params;

    const data = await this.Service.saveById(jobId);
    this.ctx.body = data;
  }
}

module.exports = DeploysController;
