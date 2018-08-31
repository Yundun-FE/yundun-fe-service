const { Controller } = require('egg')

class ProductController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.Model = ctx.model.Product
    this.Rule = {
      title: { type: 'string', required: true }
    }
  }

  async create() {
    const { title, show, index } = this.ctx.request.body
    const create = {
      title,
      show,
      index
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
    const { title, show, index } = this.ctx.request.body
    const update = {
      title,
      show,
      index
    }

    this.Model.update(update)
    this.ctx.body = update
  }

  async list() {
    const list = await this.Model.findAll()
    const total = await this.Model.count()

    this.ctx.body = {
      list,
      total
    }
  }
}

module.exports = ProductController
