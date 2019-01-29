'use strict';

const { Controller } = require('egg');
const { clearnDef } = require('../utils');
const { mergeShare } = require('../utils/object');
const { formatForm, formatRules } = require('../utils/form');
const DATA = require('../../packages/yundun-fe-common/form/jobs');

class JobsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.FORM = DATA.FORM;
    this.form = formatForm(DATA.FORM);
    this.Rules = formatRules(DATA.FORM);
    this.Model = ctx.model.Jobs;
  }

  async executor() {
    const data = await this.ctx.service.executor.getStatus();
    this.ctx.body = data;
  }

  async jobExecutor() {
    const {
      name,
    } = this.ctx.params;

    const data = await this.ctx.model.JobExecutor.findAll({
      where: {
        name,
      },
      order: [
        [ 'number', 'DESC' ],
      ],
    });
    this.ctx.body = data;
  }

  async jobExecutorNumber() {
    const {
      name,
      number,
    } = this.ctx.params;

    const data = await this.ctx.model.JobExecutor.findOne({
      where: {
        name,
        number,
      },
    });
    this.ctx.body = data;
  }

  async create() {
    const create = mergeShare(this.form, this.ctx.request.body);
    await this.ctx.validate(this.Rules, create);
    this.ctx.body = await this.Model.create(create);
  }

  async destroy() {
    const {
      id,
    } = this.ctx.params;

    await this.Model.destroy({
      where: {
        id,
      },
    });
    this.ctx.body = {
      id,
    };
  }

  async update() {
    const {
      id,
    } = this.ctx.params;
    const { ...FORM_KEYS
    } = this.ctx.request.body;
    const update = { ...FORM_KEYS,
    };

    this.ctx.validate(this.Rule, update);

    const data = await this.Model.findOne({
      where: {
        id,
      },
    });
    if (!data) throw new Error('Not Found');

    this.Model.update(update, {
      where: {
        id,
      },
    });
    this.ctx.body = update;
  }

  async index() {
    const { resources, page = 1, pageSize = 10 } = this.ctx.query;
    if (resources === 'form') {
      this.ctx.body = this.FORM;
      return;
    }

    const { title } = this.ctx.query;
    const where = clearnDef({
      title,
    });

    const list = await this.Model.findAll({
      limit: Number(pageSize),
      offset: Number(pageSize * (page - 1)),
      order: [[ 'id', 'DESC' ]],
      where,
    });
    const total = await this.Model.count({ where });

    this.ctx.body = { list, total };
  }

  async show() {
    const { id } = this.ctx.params;
    const data = await this.Model.findOne({
      where: {
        id,
      },
      include: [{
        model: this.ctx.model.Cmd,
      },
      {
        model: this.ctx.model.Accounts,
      },
      ],
    });

    const info = mergeShare(this.form, data);
    info.settings = Object.assign(this.form.settings, info.settings);
    this.ctx.body = info;
  }
}

module.exports = JobsController;
