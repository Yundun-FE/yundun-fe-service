'use strict';

const Service = require('egg').Service;

const ENV_MAP = {
  test: '测试',
  pre: '预发布',
  prod: '线上',
};
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

    const { productId } = data;
    const productData = await this.ctx.service.products.index.getById(productId);
    const { settingsOrder, settings: productSettings } = productData;

    const jobSettings = [];
    settingsOrder.forEach(name => {
      const setting = productSettings[name];
      setting.name = name;
      jobSettings.push(setting);
    });
    data.settings = jobSettings;
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
