'use strict';

const Service = require('egg').Service;

class IndexService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = this.ctx.model.Flows;
  }

  async getById(id) {
    const data = await this.Model.findOne({ where: { id } });
    return data;
  }

  async getByName(productName) {
    const data = await this.Model.findOne({ where: { productName } });
    return data;
  }

  async createTasks(name) {
    const data = await this.getByName(name);

    // if (!data)
    // const {number,}

  }
}

module.exports = IndexService;
