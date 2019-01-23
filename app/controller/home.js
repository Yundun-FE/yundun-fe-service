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
    await ctx.model.Job.sync({ alter: true });
    // await ctx.model.JobExecutor.sync({ alter: true })
    // await ctx.model.Product.sync({ alter: true })
    // await ctx.model.Cmd.sync({ alter: true })
    // await ctx.model.Website.sync({ alter: true })
    // await ctx.model.Progress.sync({ alter: true })
    // await ctx.model.Account.sync({ alter: true })
    // await ctx.model.Notice.sync({ alter: true })

    // await ctx.model.Agent.sync({ alter: true });
    // await ctx.model.Brand.sync({ alter: true });
    // await ctx.model.BrandVersion.sync({ alter: true });
    // await ctx.model.Menu.sync({ alter: true });
    // await ctx.model.MenuVersion.sync({ alter: true });

    // await ctx.model.Application.sync({ alter: true });
    // await ctx.model.AppDialog.sync({ alter: true });
    // await ctx.model.AppForm.sync({ alter: true });
    // await ctx.model.AppLabel.sync({ alter: true });
    // await ctx.model.AppPage.sync({ alter: true });
    // await ctx.model.AppTable.sync({ alter: true });
    // await ctx.model.MenuVersion.sync({ alter: true });
    // await ctx.model.Description.sync({ alter: true });

    const { name, version } = PKG;
    ctx.body = { name, version };
  }
}

module.exports = HomeController;
