const { Controller } = require('egg')

const FORM_KEYS = ['title', 'name', 'url', 'env', 'show', 'index']

class JobController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.Model = ctx.model.Job
    this.Rule = {
      title: { type: 'string', required: true },
      url: { type: 'string', required: true }
    }
  }

  async executor() {
    const data = await this.ctx.service.executor.getStatus() 
    this.ctx.body = data
  }

  async create() {
    const { ...FORM_KEYS } = this.ctx.request.body
    const create = {
      ...FORM_KEYS
    }

    this.ctx.validate(this.Rule, create)
    this.Model.create(create)
    this.ctx.body = create
  }

  async delete() {
    const { id } = this.ctx.params

    await this.Model.destroy({
      where: {
        id
      }
    })
    this.ctx.body = { id }
  }

  async update() {
    const { id } = this.ctx.params
    const { ...FORM_KEYS } = this.ctx.request.body
    const update = { ...FORM_KEYS }

    this.ctx.validate(this.Rule, update)

    const data = await this.Model.findOne({ where: { id } })
    if (!data) throw new Error('Not Found')

    this.Model.update(update, {
      where: { id }
    })
    this.ctx.body = update
  }

  async list() {
    const list = await this.Model.findAll({
      include: [
        {
          model: this.ctx.model.Cmd
        },
        {
          model: this.ctx.model.Account
        }
      ]
    })
    const total = await this.Model.count()

    this.ctx.body = {
      list,
      total
    }
  }

  async id() {
    const { id } = this.ctx.params

    const data = await this.Model.findOne({ where: { id } })
    this.ctx.body = data
  }
}

module.exports = JobController
