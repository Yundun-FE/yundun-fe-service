'use strict';

const Controller = require('egg').Controller;

class SettingsController extends Controller {
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
    const { content, type } = this.ctx.request.body;

    const jobSettings = {};
    const productSettings = [];

    if ([ 'CONFIG', 'ASSETS' ].includes(type)) {
      content.forEach(item => {
        const { name, title, enable, valueType, defaultValue, defaultI18n, value, i18n } = item;
        if (value !== defaultValue) {
          jobSettings[item.name] = {
            value,
            i18n,
          };
        }
        productSettings.push({
          name, title, enable, valueType, defaultValue, defaultI18n,
        });
      });
    } else {
      jobSettings.content = content;
    }

    const data = await this.ctx.service.jobs.getById(jobId);
    const { productId } = data;

    await this.ctx.service.products.settings.saveByName(productSettings, id, productId);
    this.ctx.body = await this.ctx.Service.saveByName(jobSettings, id, jobId);
  }
}

module.exports = SettingsController;
