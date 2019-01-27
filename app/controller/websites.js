'use strict';

const { Controller } = require('egg');

class websiteController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Websites;
    this.Rule = {
      title: { type: 'string', required: true },
      url: { type: 'string', required: true },
    };
  }

  async create() {
    const { title, url } = this.ctx.request.body;
    const create = {
      title,
      url,
    };

    this.ctx.validate(this.Rule, create);
    this.Model.create(create);
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
    const { title, url } = this.ctx.request.body;
    const update = {
      title,
      url,
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

    const data = await this.Model.findOne({ where: { id } });
    this.ctx.body = data;
  }
}

module.exports = websiteController;
