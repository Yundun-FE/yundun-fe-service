'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

function exportSettings(data) {
  const content = {};
  data.forEach(item => {
    const setting = {};
    item.settings.forEach(iItem => {
      setting[iItem.name] = iItem.valueView;
    });
    content[item.name] = setting;
  });

  return content;
}

class DeploysService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.JobsDeploys;
  }

  async findByHash(hash) {
    const data = await this.Model.findOne({ where: { hash } });
    if (!data) throw new Error('NotFound');
    return data;
  }

  async findByNumber(jobName, number) {
    const attributes = [ 'hash', 'jobName', 'jobId', 'productId', 'productName', 'content', 'menus', 'number', 'created_at', 'updated_at' ];
    const data = await this.Model.findOne({ attributes, where: { jobName, number } });
    if (!data) throw new Error('NotFound');
    return data;
  }

  async findByName(jobName) {
    const attributes = [ 'hash', 'jobName', 'jobId', 'productId', 'productName', 'content', 'menus', 'number', 'created_at', 'updated_at' ];
    const data = await this.Model.findOne({ attributes, where: { jobName }, order: [[ 'number', 'DESC' ]] });
    if (!data) throw new Error('NotFound');
    return data;
  }

  async saveByJobs(jobs) {
    const dataList = await this.ctx.Model.jobs.findAll({ where: { jobs: { $in: jobs } } });
    const ids = dataList.map(_ => _.id);
    ids.forEach(id => {
      console.log(id);
      // this.saveById(id);
    });
    return {};
  }

  async saveByIds(ids) {
    ids.forEach(id => {
      this.saveById(id);
    });
    return {};
  }

  async saveById(id) {
    const data = await this.ctx.service.jobs.v2.getById(id);
    const { id: jobId, name: jobName, productId, productName, settings, menus } = data;
    const content = exportSettings(settings);
    content.menus = menus;
    const hash = crypto.createHash('md5').update(JSON.stringify(content)).digest('hex');
    let isRepeat = true;
    try {
      await this.findByHash(hash);
    } catch (e) {
      isRepeat = false;
    }

    const create = {
      hash,
      jobId,
      jobName,
      productId,
      productName,
      settings,
      content,
      menus: [],
    };
    if (isRepeat) return create;

    let number;
    let oData;
    try {
      oData = await this.findByName(jobName);
    } catch (e) {
      number = 1;
    }
    create.number = oData ? (oData.number + 1) : number;
    return await this.Model.create(create);
  }
}

module.exports = DeploysService;
