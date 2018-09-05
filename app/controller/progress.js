const { Controller } = require('egg')
const moment = require('moment')

class ProgressController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.Model = ctx.model.Progress
  }

  async list() {
    const list = await this.ctx.service.build.getProgress()
    this.ctx.body = list
  }

  async name() {
    const { name } = this.ctx.params
    const data = await this.Model.findOne({
      where: {
        name,
        utime: {
          $gt: moment().format('X') - 60 // 只查询一分钟内
        }
      },
      order: [['updated_at', 'DESC']]
    })

    this.ctx.body = data
  }
}

module.exports = ProgressController
