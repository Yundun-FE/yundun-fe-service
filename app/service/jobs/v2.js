'use strict';

const Service = require('egg').Service;
const { isDef } = require('../../utils');

function mergeSettings(data = {}, setting) {
  setting.settings.forEach(item => {

    item.value = isDef(data[item.name]) ? data[item.name].value : '';
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
    data.settings = exportSettings;
    return data;
  }

  async saveById(update, id) {
    await this.Model.update(update, {
      where: { id },
    });
    return update;
  }
}

module.exports = V2Service;
