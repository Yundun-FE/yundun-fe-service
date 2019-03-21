'use strict';

const Controller = require('egg').Controller;

class ApplicationsVersionController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.ApplicationsVersions;
  }

  async create() {
    const create = this.ctx.request.body;
    this.ctx.body = await this.Model.create(create);
  }
}

module.exports = ApplicationsVersionController;
