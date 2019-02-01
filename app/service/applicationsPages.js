'use strict';

const Service = require('egg').Service;
const { isDef } = require('../utils');

class applicationsPagesService extends Service {
  async getByCode(code, agent) {
    const data = await this.ctx.model.ApplicationsPages.findOne({ where: { code } });

    const blocks = {};
    data.blocks.forEach(item => {
      blocks[item.name] = item;
    });

    return {
      name: data.name,
      blocks,
    };
  }
}

module.exports = applicationsPagesService;
