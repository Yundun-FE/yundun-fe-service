'use strict';

const { Controller } = require('egg');
const { formatForm, formatRules } = require('../utils/form');
const DATA = require('../../packages/yundun-fe-common/form/applicationsPages');
const { mergeShare } = require('../utils/object');
const fs = require('fs');

class applicationsPagesController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.TABLE = DATA.TABLE;
    this.FORM = DATA.FORM;
    this.form = formatForm(DATA.FORM);
    this.Rules = formatRules(DATA.FORM);
    this.Model = ctx.model.ApplicationsPages;
  }

  async create() {
    const create = mergeShare(this.form, this.ctx.request.body);
    create.words = create.words.filter(_ => _.code);

    await this.ctx.validate(this.Rules, create);
    this.ctx.body = await this.Model.create(create);
  }

  async deploy() {
    const { id } = this.ctx.params;
    const data = await this.Model.findOne({ where: { id } });
    fs.writeFile(`./data/explorer/pages/${data.code}.json`, JSON.stringify(data), function(err) {
      if (err) {
        throw err;
      }
    });
    this.ctx.body = data;
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
    const update = mergeShare(this.form, this.ctx.request.body);
    await this.ctx.validate(this.Rules, update);

    const data = await this.Model.findOne({ where: { id } });
    if (!data) throw new Error('Not Found');

    const result = await this.Model.update(update, {
      where: { id },
    });
    this.ctx.body = result;
  }

  async index() {
    const { resources, code, agent, appId } = this.ctx.query;
    if (resources === 'form') {
      this.ctx.body = this.FORM;
      return;
    }

    const where = {};
    if (appId) where.appId = appId;

    const list = await this.Model.findAll({ where });
    const total = await this.Model.count({ where });
    this.ctx.body = {
      list,
      total,
    };
  }

  async show() {
    const { id } = this.ctx.params;
    const data = await this.Model.findOne({ where: { id } });

    // const { blocks } = data;
    // data.blocks = Object.keys(blocks).map(name => {
    //   blocks.name = name;
    //   return blocks;
    // });
    this.ctx.body = data;
  }
}

module.exports = applicationsPagesController;
