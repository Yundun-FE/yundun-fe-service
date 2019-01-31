'use strict';

const Service = require('egg').Service;
const { isDef } = require('../utils');

class applicationsPagesService extends Service {
  async getByCode(code, agent) {
    const data = await this.ctx.model.ApplicationsPages.findOne({ where: { code } });

    return {
      name: data.name,
      content: data.content,
    };
  }
}

module.exports = applicationsPagesService;
