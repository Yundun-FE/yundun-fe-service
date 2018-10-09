'use strict';

const Service = require('egg').Service;

class ServiceService extends Service {
  async jobs() {
    const data = await this.service.build.getJobs();
    this.ctx.body = data;
  }

  async jobName() {
    const { name } = this.ctx.params;

    // 获取编译号
    const listJobs = await this.service.build.getJobs();
    const dataJobs = listJobs.find(_ => _.name === name);
    if (!dataJobs) {
      const message = '没有此项目';
      this.ctx.body = {
        message,
      };
      return;
    }
    const next = dataJobs.number + 1;
    Object.assign(dataJobs, { next });
    this.ctx.body = dataJobs;
  }

  async jobsStart() {
    const { name } = this.ctx.params;

    // 读取编译状态
    const listProgress = await this.service.build.getProgress();
    if (listProgress && listProgress.find(_ => _.name === name)) {
      const message = 'onbuilding';
      this.ctx.body = {
        message,
      };
      return;
    }

    // 获取编译号
    const listJobs = await this.service.build.getJobs();
    const dataJobs = listJobs.find(_ => _.name === name);
    if (!dataJobs) {
      const message = '没有此项目';
      this.ctx.body = {
        message,
      };
      return;
    }
    const number = ++dataJobs.number;

    // 保存编译配置
    const { content, config } = this.ctx.request.body;
    const create = {
      number,
      name,
      config,
      content,
    };
    await this.ctx.model.JobExecutor.create(create);

    // 启动编译
    await this.service.jenkins.jobsStart(name);

    this.ctx.body = create;
  }
}

module.exports = ServiceService;
