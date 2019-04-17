'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class VersionService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.ProductsVersions;
  }

  async create(create) {
    await this.Model.create(create);
  }

  async saveByHash(data, hash) {
    await this.getByHash(hash);
    return await this.Model.update(data, { where: { hash } });
  }

  async createByName(productName) {
    const oData = await this.getByName(productName);
    let number;
    if (!oData) {
      number = 1;
    } else {
      number = oData.number + 1;
    }

    const create = {
      productName,
      number,
      pages: [],
      status: 0,
    };

    create.hash = crypto.createHash('md5').update(JSON.stringify(create) + this.ctx.app.config.keys).digest('hex');
    await this.create(create);
    return create;
  }

  async getByHash(hash) {
    const data = await this.Model.findOne({ where: { hash } });
    if (!data) throw new Error('NotFound');
    return data;
  }

  async getByName(productName) {
    const data = await this.Model.findOne({ where: { productName }, order: [[ 'id', 'DESC' ]] });
    return data;
  }
}

module.exports = VersionService;
