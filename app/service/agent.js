'use strict';

const Service = require('egg').Service;

class AgentService extends Service {

  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Agent;
  }

  async getByCode(code) {
    const data = await this.Model.findOne({ where: { code } });

    const { brandId, menuId } = data;
    const { data: brands } = await this.ctx.model.BrandVersion.findOne({ where: { id: brandId } });
    const { menus } = await this.ctx.model.MenuVersion.findOne({ where: { id: menuId } });

    menus.forEach(menu => {
      menu.childrens.forEach(children => {
        children.name = children.alias || children.name;
        delete children.alias;
      });
    });

    return {
      name: data.name,
      code: data.code,
      website: data.website,
      brands,
      menus,
    };
  }
}

module.exports = AgentService;
