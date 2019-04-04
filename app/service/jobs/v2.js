'use strict';

const Service = require('egg').Service;

class V2Service extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.JobsV2;
  }

  async create(data) {
    const { productId } = data;
    const productData = await this.ctx.service.products.getById(productId);

    const { name: productName } = productData;
    const createData = {
      ...data,
      productName,
      productData,
    };
    const result = await this.Model.create(createData);
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
}

module.exports = V2Service;
