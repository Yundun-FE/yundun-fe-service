'use strict';

const Service = require('egg').Service;

class ServiceService extends Service {
  async jobs() {
    const data = await this.service.build.getJobs()
    this.ctx.body = data
  }
}

module.exports = ServiceService;
