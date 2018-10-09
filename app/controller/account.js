'use strict';

const { Controller } = require('egg');

const FROM_KEY = [ 'title', 'name', 'password', 'jid', 'show', 'index' ];

class AccountController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Account;
    this.Rule = {
      title: { type: 'string', required: true },
      name: { type: 'string', required: true },
    };
  }

  async create() {
    const { ...FROM_KEY } = this.ctx.request.body;
    const create = { ...FROM_KEY };

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
    const { ...FROM_KEY } = this.ctx.request.body;
    const update = { ...FROM_KEY };

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

module.exports = AccountController;
