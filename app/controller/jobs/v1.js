'use strict';

const { Controller } = require('egg');
const { clearnDef } = require('../../utils');
const { mergeShare } = require('../../utils/object');
const { formatForm, formatRules } = require('../../utils/form');
const DATA = require('../../../packages/yundun-fe-common/form/jobs');

class JobsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.FORM = DATA.FORM;
    this.form = formatForm(DATA.FORM);
    this.Rules = formatRules(DATA.FORM);
    this.Model = ctx.model.Jobs;
    this.Service = ctx.service.jobs.v1;
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
    const { id } = this.ctx.params;
    const { env } = this.ctx.request.query;
    const body = this.ctx.request.body;
    this.ctx.body = await this.Service.saveByIdEnv(id, env, body);
  }

  async index() {
    const { resources, page = 1, pageSize = 10, title, name, attr, code } = this.ctx.query;

    if (resources === 'form') {
      this.ctx.body = this.FORM;
      return;
    }

    const attributes = [ 'id', 'title', 'name', 'env', 'assets', 'jenkinsName', 'created_at', 'updated_at' ];
    if (attr) attributes.push(attr);

    const where = clearnDef({
      title,
      name: name || code,
    });

    const list = await this.Model.findAll({
      attributes,
      limit: Number(pageSize),
      offset: Number(pageSize * (page - 1)),
      order: [[ 'id', 'ASC' ]],
      where,
    });
    const total = await this.Model.count({ where });

    if (code) {
      this.ctx.body = list;
    } else {
      this.ctx.body = { list, total };
    }
  }

  async showName() {
    const { name } = this.ctx.params;

    const data = await this.Model.findAll({
      where: {
        name,
      },
    });
    this.ctx.body = data;
  }

  async show() {
    const { id } = this.ctx.params;
    const { env } = this.ctx.query;
    this.ctx.body = await this.Service.getByIdEnv(id, env);
  }
}

module.exports = JobsController;
