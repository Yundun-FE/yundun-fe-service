'use strict';

const Service = require('egg').Service;

class SettingsService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Jobs;
    this.Service = ctx.service.jobs.settings;
  }

  async saveByName(settingsData, name, id) {
    const data = await this.ctx.service.jobs.getById(id);
    const { settings } = data;
    settings[name] = settingsData;
    const updateData = {
      settings,
    };
    return await this.Model.update(updateData, id);
  }
}

module.exports = SettingsService;
