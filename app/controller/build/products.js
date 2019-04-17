'use strict';

const Controller = require('egg').Controller;

class ProductsController extends Controller {
  // constructor(ctx) {
  //   super(ctx);
  //   this.Model = ctx.model.ProductsVersions;
  // }

  async create() {
    const { productName } = this.ctx.params;
    const data = await this.ctx.service.products.versions.createByName(productName);
    this.ctx.body = data;
  }

  async saveHash() {
    const { hash } = this.ctx.params;
    const dataRules = {
      pages: { type: 'array', required: true },
    };
    await this.ctx.validate(dataRules, this.ctx.request.body);
    const { pages } = this.ctx.request.body;
    const updateData = {
      pages,
      status: 1,
    };
    this.ctx.body = await this.ctx.service.products.versions.saveByHash(updateData, hash);
  }
}

module.exports = ProductsController;
