'use strict';

const Controller = require('egg').Controller;

class ProductsSettingsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Products;
    this.Service = ctx.service.products.settings;
    this.Rules = {
      id: { type: 'string', required: true },
      name: { type: 'string', required: true },
    };
  }

  async create() {
    const paramsRules = {
      productId: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);
    const { productId } = this.ctx.params;

    const { name, title, type } = this.ctx.request.body;
    const createData = {
      name, title, type,
    };
    const createRules = {
      name: { type: 'string', required: true },
    };
    await this.ctx.validate(createRules, createData);
    this.ctx.body = await this.Service.create(createData, productId);
  }

  async destroy() {
    const paramsRules = {
      productId: { type: 'string', required: true },
      id: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);

    const { productId, id } = this.ctx.params;
    this.ctx.body = await this.Service.deleteByName(id, productId);
  }

  async update() {
    const paramsRules = {
      productId: { type: 'string', required: true },
      id: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);
    const { productId, id } = this.ctx.params;

    const { title } = this.ctx.request.body;
    const update = {
      title,
    };
    this.ctx.body = await this.Service.saveByName(update, id, productId);
  }
}

module.exports = ProductsSettingsController;
