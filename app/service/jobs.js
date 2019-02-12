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

  async saveByIdEnv(id, env = 'root', data) {
    const dataRoot = await this.Model.findOne({ where: { id, env: 'root' } });
    if (!dataRoot) throw new Error('没有找到 root');

    const name = dataRoot.name;
    const update = {
      title: data.title,
      url: data.url,
      assets: data.assets,
      settings: data.settings,
      menus: data.menus,
    };
    const result = await this.Model.update(update, {
      where: { name, env },
    });
    return result;
  }

  async getByIdEnv(id, env = 'root') {
    const dataRoot = await this.Model.findOne({
      where: {
        id,
      },
    });
    dataRoot.settings = Object.assign(this.form.settings, dataRoot.settings);
    if (env === 'root') return dataRoot;
    // 合并子环境
    const dataEnv = await this.Model.findOne({
      where: {
        name: dataRoot.name,
        env,
      },
    });

    const data = {
      env,
      rootTitle: dataRoot.title,
      title: dataEnv.title,
      menus: dataEnv.menus,
      name: dataEnv.name,
      assets: Object.assign(dataEnv.assets, dataEnv.assets),
    };
    return data;
  }

  async getByCode(name) {
    const data = await this.Model.findAll({
      where: {
        name,
      },
    });
    return data;
  }

  async getByCodeEnv(name, env = 'root') {
    const dataRoot = await this.Model.findOne({
      where: {
        name,
        env: 'root',
      },
    });
    if (env === 'root') return dataRoot;

    const dataEnv = await this.Model.findOne({
      where: {
        name,
        env,
      },
    });
    dataEnv.assets = Object.assign(dataRoot.assets, dataEnv.assets);
    return dataEnv;
  }
}

module.exports = JobsService;
