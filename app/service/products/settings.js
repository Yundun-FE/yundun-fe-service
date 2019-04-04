'use strict';

const Service = require('egg').Service;
const { arrRemove } = require('../../utils/array');

class SettingsService extends Service {
  async create(settingData, id) {
    const data = await this.ctx.service.products.index.getById(id);
    const { settings, settingsOrder } = data;

    const { name } = settingData;
    if (settings[name]) throw new Error('NameExist');

    delete settingData.name;
    settings[name] = settingData;
    settingsOrder.push(name);

    const createData = {
      settings,
      settingsOrder,
    };
    return await this.ctx.service.products.index.saveById(createData, id);
  }

  async deleteByName(name, id) {
    const data = await this.ctx.service.products.index.getById(id);
    const { settings, settingsOrder } = data;

    delete settings[name];
    arrRemove(settingsOrder, name);

    const updateData = {
      settings,
      settingsOrder,
    };
    return await this.ctx.service.products.index.saveById(updateData, id);
  }

  async saveByName(settingData, name, id) {
    const data = await this.ctx.service.products.index.getById(id);
    const { settings } = data;
    settings[name] = settingData;
    const updateData = {
      settings,
    };
    return await this.ctx.service.products.index.saveById(updateData, id);
  }
}

module.exports = SettingsService;
