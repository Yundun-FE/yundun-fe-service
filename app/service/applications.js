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
  console.log(data);
  return list;
}

class ApplicationService extends Service {
  constructor(ctx) {
    super(ctx);
    this.TABLE = DATA.TABLE;
    this.FORM = DATA.FORM;
    this.form = formatForm(DATA.FORM);
    this.Rules = formatRules(DATA.FORM);
    this.Model = ctx.model.Application;
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
}

module.exports = ApplicationService;
