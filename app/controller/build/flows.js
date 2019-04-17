'use strict';

const Controller = require('egg').Controller;

class FlowsController extends Controller {
  async flowName() {
    const { flowName, number } = this.ctx.params;

    const state = [
      {
        name: '',
        status: 'Success',
        jobs: [
          {
            productName: 'console-v6-web',

          },
        ],
      },
    ];
  }
}

module.exports = FlowsController;
