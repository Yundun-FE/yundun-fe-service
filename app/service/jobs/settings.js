'use strict';

const Service = require('egg').Service;

class JobsSettingsService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Jobs;
  }

  async saveByName(settingsData, name, id) {
    const data = await this.ctx.service.jobs.v2.getById(id);
    const { settings } = data;
    settings[name] = settingsData;
    const updateData = {
      settings,
    };
    return await this.Model.update(updateData, { where: { id } });
  }
}

module.exports = JobsSettingsService;
