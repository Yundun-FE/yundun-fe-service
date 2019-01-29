'use strict';

const Controller = require('egg').Controller;
const PKG = require('../../package.json');
const fs = require('fs');
const path = require('path');

function readDirSync(path) {
  const pa = fs.readdirSync(path);

  console.log(pa);
}

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { name, version } = PKG;
    ctx.body = { name, version };
  }


  async install() {
    const { ctx } = this;
    // await ctx.model.Jobs.sync({ alter: true });
    await ctx.model.JobExecutor.sync({ alter: true });
    // await ctx.model.Products.sync({ alter: true })
    // await ctx.model.Websites.sync({ alter: true })
    // await ctx.model.Progress.sync({ alter: true })
    // await ctx.model.Accounts.sync({ alter: true })
    // await ctx.model.Notice.sync({ alter: true })
    // await ctx.model.Applications.sync({ alter: true });
    // await ctx.model.ApplicationsPages.sync({ alter: true });
    const { name, version } = PKG;
    ctx.body = { name, version };
  }

  async update() {
    readDirSync('../');
  }
}

module.exports = HomeController;
