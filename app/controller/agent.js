'use strict';

const { Controller } = require('egg');
const DATA = require('../../packages/yundun-fe-common/form/agent');
const { mergeShare } = require('../utils/object');
const { formatForm, formatRules } = require('../utils/form');

class AgentController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Agent;
    this.FORM = DATA.FORM;
    this.form = formatForm(DATA.FORM);
    this.Rules = formatRules(DATA.FORM);
  }

  async create() {
    const create = mergeShare(this.form, this.ctx.request.body);
    await this.ctx.validate(this.Rules, create);
    this.ctx.body = await this.Model.create(create);
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

    this.Model.update(update, {
      where: { id },
    });
    this.ctx.body = update;
  }

  async list() {
    const { resources, code } = this.ctx.query;
    if (resources === 'form') {
      this.ctx.body = this.FORM;
      return;
    }
    if (code) {
      this.ctx.body = await this.ctx.service.agent.getByCode(code);
      return;
    }

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

module.exports = AgentController;
