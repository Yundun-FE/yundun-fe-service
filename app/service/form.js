'use strict';

const Service = require('egg').Service;

function formatForm(data) {
  const form = {};
  data.forEach(item => {
    form[item.prop] = data.default || '';
  });
  return form;
}

function formatRules(data) {
  const rules = {};
  data.forEach(item => {
    if (item.rules) rules[item.prop] = item.rules;
  });
  return rules;
}

class FormService extends Service {
  async format(data) {
    const { FORM, TABLE } = data;
    return {
      form: formatForm(FORM),
      rules: formatRules(FORM),
      FORM,
      TABLE,
    };
  }
}

module.exports = FormService;
