'use strict';

const Service = require('egg').Service;
const { isDef } = require('../utils');

class AppPageService extends Service {
  async getByCode(code, agent) {
    const data = await this.ctx.model.AppPage.findOne({ where: { code } });
    const words = {};
    data.words.forEach(item => {
      words[item.key] = agent && isDef(item.valueOem) ? item.valueOem : item.value;
    });
    const settings = {};
    data.settings.forEach(item => {
      settings[item.key] = agent && isDef(item.valueOem) ? item.valueOem : item.value;
    });

    return {
      name: data.name,
      words,
      settings,
      content: data.content,
    };
  }
}

module.exports = AppPageService;
