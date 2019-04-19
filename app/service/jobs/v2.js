'use strict';

const Service = require('egg').Service;
const { isDef } = require('../../utils');

// 合并配置输出
function mergeSettings(data = {}, setting) {
  setting.settings.forEach(item => {
    const _data = data[item.name];
    if (_data && _data.enable === false) {
      item.enable = false;
      return;
    }
    item.enable = true;
    // write value
    item.value = _data ? _data.value : '';
    // use default value
    item.valueView = (isDef(item.value) && item.value !== '') ? item.value : item.defaultValue;
  });
}

class V2Service extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.JobsV2;
  }

  async create(data) {
    const { name: _name, title, envs, productId } = data;
    const productData = await this.ctx.service.products.index.getById(productId);

    const { name: productName } = productData;
    const name = `${productName}/${_name}`;
    const nameList = [ name ];

    if (envs && envs.length > 0) nameList.push(...envs.map(item => `${name}--${item}`));

    const createList = nameList.map(name => {
      return {
        name,
        title,
        productId,
        productName,
        settings: {},
        menus: [],
      };
    });

    const result = await this.Model.bulkCreate(createList);
    const { id } = result;
    return { id };
  }

  async getById(id) {
    const data = await this.Model.findOne({ where: { id } });
    if (!data) throw new Error('NotFound');
    const { settings: jobSettings, name } = data;

    let rootSettings = {};
    let rootName;
    if (name.includes('--')) {
      rootName = name.split('--')[0];
      const rootData = await this.Model.findOne({ where: { name: rootName } });
      rootSettings = rootData.settings;
    }

    const { productId } = data;
    const productData = await this.ctx.service.products.index.getById(productId);
    const { settingsOrder, settings: productSettings } = productData;

    const exportSettings = [];
    // 按顺序组合
    settingsOrder.forEach(name => {
      const setting = productSettings[name];
      setting.name = name;
      setting.useParent = false;
      const data = jobSettings[name];

      if (data) {
        mergeSettings(data, setting);
      } else {
        // 与父配置合并
        if (rootSettings[name]) {
          setting.useParent = true;
          mergeSettings(rootSettings[name], setting);
        } else {
          mergeSettings({}, setting);
        }
      }
      exportSettings.push(setting);
    });

    const env = data.name.split('/')[1];

    const nData = {
      id: data.id,
      name: data.name,
      env,
      title: data.title,
      productId: data.productId,
      productName: data.productName,
      settings: exportSettings,
      menus: data.menus,
      pages: data.pages,
      created_at: data.created_at,
      updated_at: data.updated_at,
      rootName,
    };
    return nData;
  }

  async saveById(update, id) {
    await this.Model.update(update, {
      where: { id },
    });
    return await this.ctx.service.jobs.deploys.saveById(id);
  }

  async saveByIds(update, ids) {
    await this.Model.update(update, {
      where: { id: { $in: ids } },
    });
    return await this.ctx.service.jobs.deploys.saveByIds(ids);
  }

  async saveByJobs(update, jobs) {
    await this.Model.update(update, {
      where: { jobs: { $in: jobs } },
    });
    return await this.ctx.service.jobs.deploys.saveByJobs(jobs);
  }

  async saveByName(update, name) {
    await this.Model.update(update, {
      where: { name },
    });
    return update;
  }
}

module.exports = V2Service;
