'use strict';

const { Controller } = require('egg');
const { mergeShare } = require('../utils/object');
const { formatForm, formatRules } = require('../utils/form');
const DATA = require('../../packages/yundun-fe-common/form/application');

class ApplicationController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.TABLE = DATA.TABLE;
    this.FORM = DATA.FORM;
    this.form = formatForm(DATA.FORM);
    this.Rules = formatRules(DATA.FORM);
    this.Model = ctx.model.Application;
  }

  async create() {
    const create = mergeShare(this.form, this.ctx.request.body);
    await this.ctx.validate(this.Rules, create);
    this.ctx.body = await this.ctx.service.application.create(create);
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
    const update = mergeShare(this.form, this.ctx.request.body);
    await this.ctx.validate(this.Rules, update);

    const data = await this.Model.findOne({ where: { id } });
    if (!data) throw new Error('Not Found');

    this.ctx.body = await this.ctx.service.application.updateId(id, update);
  }

  async list() {
    const list = await this.Model.findAll();
    const total = await this.Model.count();
    const { resources } = this.ctx.query;
    if (resources === 'form') {
      this.ctx.body = this.FORM;
      return;
    } else if (resources === 'table') {
      this.ctx.body = this.TABLE;
      return;
    }

    list.forEach(item => {
      if (!item.menus) item.menus = [];
    });

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

module.exports = ApplicationController;
