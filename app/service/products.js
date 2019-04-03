'use strict';

const Service = require('egg').Service;

class ProductsService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Products;
  }

  async getById(id) {
    const data = await this.Model.findOne({ where: { id } });
    if (!data) throw new Error('NotFoundProduct');
    return data;
  }
}

module.exports = ProductsService;
