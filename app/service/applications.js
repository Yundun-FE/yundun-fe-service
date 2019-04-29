'use strict';

const Service = require('egg').Service;
const DATA = require('../../packages/yundun-fe-common/form/applications');
const { mergeShare } = require('../utils/object');
const { formatForm, formatRules } = require('../utils/form');

const MENUS_CHILDREN_ROW = [
  {
    id: 0,
    code: '',
    name: '',
    alias: '',
  },
];

function formatMenus(data) {
  const list = [];
  data.forEach(item => {
    list.push(mergeShare(MENUS_CHILDREN_ROW, item));
  });
  return list;
}

class ApplicationService extends Service {
  constructor(ctx) {
    super(ctx);
    this.TABLE = DATA.TABLE;
    this.FORM = DATA.FORM;
    this.form = formatForm(DATA.FORM);
    this.Rules = formatRules(DATA.FORM);
    this.Model = ctx.model.Applications;
  }

  async create(data) {
    // data.menus = formatMenus(data.menus);
    const result = await this.Model.create(data);
    return result;
  }

  async updateId(id, data) {
    // data.menus = formatMenus(data.menus);
    const result = await this.Model.update(data, {
      where: { id },
    });
    return result;
  }

  async getByIdEnv(id, env) {
    const dataRoot = await this.Model.findOne({
      where: {
        id,
      },
    });

    const name = dataRoot.name;
    const dataEnv = await this.Model.findOne({
      where: {
        name,
        env,
      },
    });
    console.log(dataEnv);

    const data = Object.assign(dataRoot, dataEnv);
    return data;
  }
}

module.exports = ApplicationService;
