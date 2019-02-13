'use strict';

const Service = require('egg').Service;
const { isDef } = require('../utils');
const { formatForm } = require('../utils/form');
const DATA = require('../../packages/yundun-fe-common/form/jobs');

function exportSettings(data) {
  const settings = {};
  data.forEach(item => {
    const name = item.name;
    delete item.name;
    settings[name] = item;
  });
  return settings;
}

function formatSettings(rootSettings, envData) {
  rootSettings.forEach(item => {
    const envItem = envData[item.name];
    if (!envItem) return;
    Object.keys(item).forEach(key => {
      if (isDef(envItem[item.name])) item[key] = envItem[item.name];
    });
  });
  return rootSettings;
}

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
  // ID + ENV 保存
  async saveByIdEnv(id, env = 'root', data) {
    const dataRoot = await this.Model.findOne({ where: { id, env: 'root' } });
    if (!dataRoot) throw new Error('没有找到 root');

    const name = dataRoot.name;
    // Assets 提取
    const { assets: assetsSettings, proxy: proxySettings, options: optionsSettings } = data.settings;
    const assets = {};
    assetsSettings.forEach(item => {
      assets[item.key] = data.assets[item.key];
    });
    // 提取
    const proxy = exportSettings(proxySettings);
    const options = exportSettings(optionsSettings);

    const update = {
      title: data.title,
      url: data.url,
      menus: data.menus,
      assets,
      options,
      proxy,
    };

    if (env === 'root') {
      update.settings = data.settings;
    }
    const result = await this.Model.update(update, {
      where: { name, env },
    });
    return result;
  }
  // ID + ENV 读取
  async getByIdEnv(id, env = 'root') {
    const dataRoot = await this.Model.findOne({
      where: {
        id,
      },
    });
    const settings = Object.assign(this.form.settings, dataRoot.settings);
    if (env === 'root') return dataRoot;
    // 合并环境
    const dataEnv = await this.Model.findOne({
      where: {
        name: dataRoot.name,
        env,
      },
    });

    const { assets: assetsSettings, proxy: proxySettings, options: optionsSettings } = settings;
    settings.proxy = formatSettings(proxySettings, dataEnv.proxy);

    const data = {
      env,
      rootTitle: dataRoot.title,
      title: dataEnv.title,
      menus: dataEnv.menus,
      name: dataEnv.name,
      settings,
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
