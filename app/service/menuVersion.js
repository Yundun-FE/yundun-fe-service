'use strict';

const Service = require('egg').Service;
const DATA = require('../../packages/yundun-fe-common/form/application');
const { mergeShare } = require('../utils/object');
const { formatForm, formatRules } = require('../utils/form');

const MENUS_ROW = {
  name: '',
  childrens: [],
};


const MENUS_CHILDREN_ROW = {
  id: 0,
  code: '',
  name: '',
  alias: '',
};


function formatMenus(data) {
  const list = [];
  data.forEach(item => {
    list.push(mergeShare(MENUS_ROW, item));
  });
  console.log(list);

  list.forEach(item => {
    const childrens = [];
    item.childrens.forEach(_ => {
      childrens.push(mergeShare(MENUS_CHILDREN_ROW, _));
    });
    item.childrens = childrens;
  });

  console.log(list);
  return list;
}

class MenuService extends Service {
  constructor(ctx) {
    super(ctx);
    this.TABLE = DATA.TABLE;
    this.FORM = DATA.FORM;
    this.form = formatForm(DATA.FORM);
    this.Rules = formatRules(DATA.FORM);
    this.Model = ctx.model.MenuVersion;
  }

  async create(data) {
    // data.menus = formatMenus(data.menus);
    const result = await this.Model.create(data);
    return result;
  }

  async updateId(id, data) {
    data.menus = formatMenus(data.menus);
    const result = await this.Model.update(data, {
      where: { id },
    });
    return result;
  }
}

module.exports = MenuService;
