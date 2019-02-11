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
    this.Service = ctx.service.jobs;
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
    const { env } = this.ctx.query;

    // const data = await this.Model.findOne({
    //   where: {
    //     id,
    //   },
    // });
    // if (!data) throw new Error('Not Found');

    // id = env === 'root' ? id : await this.Service.findNameEnvToId(data.name, env);
    // const update = mergeShare(this.form, this.ctx.request.body);
    const body = this.ctx.request.body;

    // const update = {
    //   title: body.title,
    //   url: body.url,
    //   assets: body.assets,
    // };

    // if (env === 'root') {
    //   update.settings = body.settings;
    // }

    // this.ctx.body = await this.ctx.service.jobs.updateById(id, update);
    this.ctx.body = await this.Service.saveByIdEnv(id, env, body);
  }

  async index() {
    const { resources, page = 1, pageSize = 10, env = 'root' } = this.ctx.query;
    if (resources === 'form') {
      this.ctx.body = this.FORM;
      return;
    }

    const { title } = this.ctx.query;
    const where = clearnDef({
      env,
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

  async showName() {
    const { name } = this.ctx.params;
    const { env } = this.ctx.query;

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
