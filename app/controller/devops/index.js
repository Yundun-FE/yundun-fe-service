'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Service = ctx.service.devops.index;
  }

  async create() {
    const formRules = {
      sshUrl: { type: 'string', required: true },
      productId: { type: 'string', required: true },
      productName: { type: 'string', required: true },
      flows: { type: 'json', required: true },
    };

    /*
    flows: [
      {
        name: '生成编译任务',
        content: {
          pages: '',
          number: '',
          jenkinsUrl: ''
        },
      },
      {
        name: '发布应用',
        content: {
          envs: '',
          jenkinsUrl: ''
        },
      }
    ]
    */
    await this.ctx.validate(formRules, this.ctx.request.body);
    const { productId, productName, flows } = this.ctx.request.body;
    const create = {
      productId,
      productName,
      flows,
    };

    this.ctx.body = await this.Service.create(create);
  }
}

module.exports = IndexController;
