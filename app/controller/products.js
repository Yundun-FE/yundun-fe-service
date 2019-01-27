'use strict';

const { Controller } = require('egg');

class ProductController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Product;
    this.Rule = {
      title: { type: 'string', required: true },
    };
  }

  async create() {
    const { title, show, index } = this.ctx.request.body;
    const create = {
      title,
      show,
      index,
    };

    this.ctx.validate(this.Rule, create);
    this.Model.create(create);
    this.ctx.body = create;
  }

  async delete() {
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
    const { title, show, index } = this.ctx.request.body;
    const update = {
      title,
      show,
      index,
    };

    this.ctx.validate(this.Rule, update);

    const data = await this.Model.findOne({ where: { id } });
    if (!data) throw new Error('Not Found');

    this.Model.update(update, {
      where: { id },
    });
    this.ctx.body = update;
  }

  async list() {
    const list = await this.Model.findAll();
    const total = await this.Model.count();

    this.ctx.body = {
      list,
      total,
    };
  }

  async id() {
    const { id } = this.ctx.params;

    const data = await this.Model.findOne({ where: { id } });
    this.ctx.body = data;
  }
}

module.exports = ProductController;
