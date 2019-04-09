'use strict';

const Controller = require('egg').Controller;

class JobsSettingsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Jobs;
    this.Service = ctx.service.jobs.settings;
  }

  async update() {
    console.log(this.ctx.params);
    const paramsRules = {
      jobId: { type: 'string', required: true },
      id: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);
    const { jobId, id } = this.ctx.params;

    const { title, columnsOptions: _columnsOptions } = this.ctx.request.body;
    const jobSettings = {};
    const columnsOptions = [];

    _columnsOptions.forEach(item => {
      const { name, title, valueType, defaultValue, value } = item;
      columnsOptions.push({
        name, title, valueType, defaultValue, defaultI18n: {},
      });
      jobSettings[name] = {
        value,
        i18n: {},
      };
    });

    const productSettings = {
      title,
      columnsOptions,
    };
    const data = await this.ctx.service.jobs.v2.getById(jobId);
    const { productId } = data;

    await this.ctx.service.products.settings.saveByName(productSettings, id, productId);
    this.ctx.body = await this.Service.saveByName(jobSettings, id, jobId);
  }
}

module.exports = JobsSettingsController;
