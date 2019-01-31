'use strict';

const Service = require('egg').Service;
const { formatForm, formatRules } = require('../utils/form');
const DATA = require('../../packages/yundun-fe-common/form/jobs');

class JobsService extends Service {
  constructor(ctx) {
    super(ctx);
    this.form = formatForm(DATA.FORM);
    this.Model = ctx.model.Jobs;
  }
  // 名称ID查找项目ID
  async findNameEnvToId(name, env) {
    const data = await this.Model.findOne({
      where: {
        name,
        env,
      },
    });
    if (!data) throw new Error('Not Found');
    return data.id;
  }

  async updateById(id, update) {
    this.Model.update(update, {
      where: {
        id,
      },
    });
    return { id };
  }

  async findByIdEnv(id, env = 'root') {
    const data = await this.Model.findOne({
      where: {
        id,
      },
    });
    data.settings = Object.assign(this.form.settings, data.settings);
    if (env === 'root') return data;
    // 合并子环境
    const dataEnv = await this.Model.findOne({
      where: {
        name: data.name,
        env,
      },
    });

    data.env = env;
    Object.assign(data.assets, dataEnv.assets);
    return data;
  }
}

module.exports = JobsService;
