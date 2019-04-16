'use strict';

const Service = require('egg').Service;

class IndexService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Devops;
  }

  async create(create) {
    return await this.Model.create(create);
  }
}

module.exports = IndexService;
