'use strict';

const Controller = require('egg').Controller;

class FlowsController extends Controller {
  async create() {
    const data = this.ctx.request.body;
    const { event_name, user_name, user_email, project, commits } = data;
    const name = project.name;

    if (event_name === 'push') {
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

      // 读取配置
      const messages = commits.map(_ => _.message);
      const reg = /^.+?\[(.+?)\].+?\[(.+?)\].*$/;
      const m = reg.exec(messages);

      let config = [];
      m.forEach((item, index) => {
        if (index > 0) {
          config.concat(item.split(','));
        }
      });
      config = [ ...new Set(config) ];

      if (config.length === 0) {
        this.ctx.body = 'no config';
        return;
      }

      const create = {
        number,
        name,
        config,
        commits,
        userName: user_name,
        userEmail: user_email,
      };
      await this.ctx.model.jobExecutor.create(create);
      this.ctx.service.jobsStart(name);
    }

    this.ctx.body = 'ok';
  }
}

module.exports = FlowsController;
