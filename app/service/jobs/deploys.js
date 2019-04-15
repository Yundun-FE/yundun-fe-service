'use strict';

const Service = require('egg').Service;

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
  async saveById(id) {
    const data = await this.ctx.service.jobs.v2.getById(id);
    const { id: jobId, name: jobName, productId, productName, settings } = data;

    const create = {
      jobId,
      jobName,
      productId,
      productName,
      settings,
      content: exportSettings(settings),
    };
    return create;
  }
}

module.exports = DeploysService;
