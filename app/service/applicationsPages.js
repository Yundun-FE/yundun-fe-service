'use strict';

const Service = require('egg').Service;
const { isDef } = require('../utils');

class applicationsPagesService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.ApplicationsPages;
  }

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

  async findByIdEnv(id, env = 'root') {
    const data = await this.Model.findOne({
      where: {
        id,
      },
    });
    if (env === 'root') return data;
    // 合并子环境
    // const dataEnv = await this.Model.findOne({
    //   where: {
    //     name: data.name,
    //     env,
    //   },
    // });

    data.env = env;
    // Object.assign(data.assets, dataEnv.assets);
    return data;
  }
}

module.exports = applicationsPagesService;
