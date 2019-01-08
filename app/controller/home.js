'use strict';

const Controller = require('egg').Controller;
const PKG = require('../../package.json');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { name, version } = PKG;
    ctx.body = { name, version };
  }

  async install() {
    const { ctx } = this;
    // await ctx.model.Job.sync({ force: true })
    // await ctx.model.JobExecutor.sync({ force: true })
    // await ctx.model.Product.sync({ force: true })
    // await ctx.model.Cmd.sync({ force: true })
    // await ctx.model.Website.sync({ force: true })
    // await ctx.model.Progress.sync({ force: true })
    // await ctx.model.Account.sync({ force: true })
    // await ctx.model.Notice.sync({ force: true })

    // await ctx.model.Agent.sync({ force: true });
    // await ctx.model.Brand.sync({ force: true });
    // await ctx.model.BrandVersion.sync({ force: true });
    await ctx.model.Menu.sync({ force: true });
    // await ctx.model.MenuVersion.sync({ force: true });
    // await ctx.model.Description.sync({ force: true });

    const { name, version } = PKG;
    ctx.body = { name, version };
  }
}

module.exports = HomeController;
