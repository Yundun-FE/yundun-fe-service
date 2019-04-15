'use strict';

const Controller = require('egg').Controller;
const { isDef } = require('../../utils');

class JobsSettingsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Jobs;
    this.Service = ctx.service.jobs.settings;
  }

  async update() {
    const paramsRules = {
      jobId: { type: 'string', required: true },
      id: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);
    const { jobId, id } = this.ctx.params;

    const { title, settings: _settings } = this.ctx.request.body;
    const jobSettings = {};
    const settings = [];

    _settings.forEach(item => {
      const { name, title, valueType, defaultValue, value } = item;
      settings.push({
        name, title, valueType, defaultValue, defaultI18n: {},
      });
      if (isDef(value)) {
        jobSettings[name] = {
          value,
          i18n: {},
        };
      }
    });

    const productSettings = {
      title,
      settings,
    };
    const data = await this.ctx.service.jobs.v2.getById(jobId);
    const { productId } = data;

    await this.ctx.service.products.settings.saveByName(productSettings, id, productId);
    this.ctx.body = await this.Service.saveByName(jobSettings, id, jobId);
  }

  async destroy() {
    const paramsRules = {
      jobId: { type: 'string', required: true },
      id: { type: 'string', required: true },
    };
    await this.ctx.validate(paramsRules, this.ctx.params);
    const { jobId, id } = this.ctx.params;
    this.ctx.body = await this.Service.deleteByName(id, jobId);
  }
}

module.exports = JobsSettingsController;
