'use strict';

const { Controller } = require('egg');
const { FORM, RULES } = require('../../packages/yundun-fe-common/form/menu');
const { mergeShare } = require('../utils/object');

class MenuController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Menu;
    this.Rules = RULES;
  }

  async create() {
    const create = mergeShare(FORM, this.ctx.request.body);
    await this.ctx.validate(this.Rules, create);
    const result = await this.Model.create(create);
    this.ctx.body = result;
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
    const update = mergeShare(FORM, this.ctx.request.body);
    await this.ctx.validate(this.Rules, update);

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
    const { resources } = this.ctx.query;
    if (resources === 'rules') {
      this.ctx.body = {
        form: FORM,
        rules: RULES,
      };
      return;
    }

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

module.exports = MenuController;
