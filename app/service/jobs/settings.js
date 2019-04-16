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

  async deleteByName(name, id) {
    const data = await this.Model.findOne({ where: { id } });
    if (!data) throw new Error('NotFound');
    const { settings } = data;
    delete (settings[name]);
    const updateData = {
      settings,
    };
    return await this.ctx.service.jobs.v2.saveById(updateData, id);
  }

  async saveByName(settingsData, name, id) {
    const settings = await this.getById(id);
    settings[name] = settingsData;
    const updateData = {
      settings,
    };
    await this.ctx.service.jobs.v2.saveById(updateData, id);
    return await this.ctx.service.jobs.deploys.saveById(id);
  }
}

module.exports = JobsSettingsService;
