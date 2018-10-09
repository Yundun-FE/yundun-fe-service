'use strict';

const Controller = require('egg').Controller;

class NoticeController extends Controller {
  async list() {
    const { clientid } = this.ctx.query;

    if (!clientid) {
      this.ctx.body = 'not client id';
      return;
    }
    this.ctx.service.client.login(clientid);

    const data = await this.ctx.model.Notice.findAll({
      where: { clientid, isRead: false },
    });

    await this.ctx.model.Notice.update(
      { isRead: true },
      { where: { clientid } }
    );
    this.ctx.body = data;
  }
}

module.exports = NoticeController;
