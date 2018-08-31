'use strict'

const Controller = require('egg').Controller
const PKG = require('../../package.json')

class HomeController extends Controller {
  async index() {
    const { ctx } = this 

    // await ctx.model.Node.sync({ force: true })
    // await ctx.model.Product.sync({ force: true })
    // await ctx.model.ProductNode.sync({ force: true })
    // await ctx.model.ProductNodeCmd.sync({ force: true })
    // await ctx.model.Build.sync({ force: true })
    // await ctx.model.BuildProgress.sync({ force: true })
    // await ctx.model.Account.sync({ force: true })

    const { name, version } = PKG
    ctx.body = { name, version }
  }
}

module.exports = HomeController
