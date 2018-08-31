const { Controller } = require('egg')

class ProgressController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.Model = ctx.model.Progress
  }

  async list() {
    const list = await this.ctx.service.build.getProgress()
    this.ctx.body = list
  }
}

module.exports = ProgressController
