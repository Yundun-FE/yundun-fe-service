'use strict';

const Service = require('egg').Service;

class JobsSettingsService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.JobsV2;
  }

  async getById(id) {
    const data = await this.Model.findOne({ where: { id } });
    if (!data) throw new Error('NotFound');
    return data.settings;
  }

  async saveByName(settingsData, name, id) {
    console.log(settingsData);
    // return;
    const settings = await this.getById(id);
    settings[name] = settingsData;
    console.log(settings);
    const updateData = {
      settings,
    };
    return await this.ctx.service.jobs.v2.saveById(updateData, id);
  }
}

module.exports = JobsSettingsService;
