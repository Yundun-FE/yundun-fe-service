'use strict';

const { Controller } = require('egg');
const { clearnDef } = require('../../utils');

class JobsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.JobsV2;
    this.Service = ctx.service.jobs.v2;
  }

  async create() {
    const { name, title, productId, envs } = this.ctx.request.body;
    const createData = {
      name, title, productId, envs,
    };

    const createResult = await this.Service.create(createData);
    this.ctx.body = createResult;
  }

  async destroy() {
    const { id } = this.ctx.params;

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
    const { title, jenkinsUrl, menus, menusSync = [] } = this.ctx.request.body;
    const saveData = {
      title, jenkinsUrl, menus,
    };
    this.ctx.body = await this.Service.saveById(saveData, id);
  }

  async index() {
    const { page = 1, pageSize = 10, title, name, productName } = this.ctx.query;
    const where = clearnDef({
      title,
      name,
      productName,
    });

    const list = await this.Model.findAll({
      limit: Number(pageSize),
      offset: Number(pageSize * (page - 1)),
      order: [[ 'id', 'ASC' ]],
      where,
    });
    const total = await this.Model.count({ where });
    this.ctx.body = { list, total };
  }

  async show() {
    const { id } = this.ctx.params;
    this.ctx.body = await this.Service.getById(id);
  }
}

module.exports = JobsController;
