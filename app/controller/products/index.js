'use strict';

const { Controller } = require('egg');

class ProductController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Products;
    this.Service = ctx.service.products.index;
    this.Rule = {
      name: { type: 'string', required: true },
    };
  }

  async create() {
    const { title, name, description } = this.ctx.request.body;
    const create = {
      title,
      name,
      description,
      settings: {},
    };

    this.ctx.validate(this.Rule, create);
    await this.Model.create(create);
    this.ctx.body = create;
  }

  async destroy() {
    const { id } = this.ctx.params;

    await this.Model.destroy({
      where: {
        id,
      },
    });
    this.ctx.body = { id };
  }

  async update() {
    const { id } = this.ctx.params;
    const { title, description } = this.ctx.request.body;
    const update = {
      title,
      description,
    };

    this.ctx.validate(this.Rule, update);

    const data = await this.Model.findOne({ where: { id } });
    if (!data) throw new Error('Not Found');

    this.Model.update(update, {
      where: { id },
    });
    this.ctx.body = update;
  }

  async index() {
    const list = await this.Model.findAll();
    const total = await this.Model.count();

    this.ctx.body = {
      list,
      total,
    };
  }

  async show() {
    const { id } = this.ctx.params;
    const data = await this.Service.getById(id);
    this.ctx.body = data;
  }
}

module.exports = ProductController;
