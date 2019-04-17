'use strict';

const Controller = require('egg').Controller;

class ReleasesController extends Controller {
  async create() {
    const { productName } = this.ctx.params;

    const { content } = this.ctx.request.body;

    console.log(productName);
    this.ctx.body = productName;
  }
}

module.exports = ReleasesController;
