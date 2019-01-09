const { isDef } = require('./');

function formatForm(data) {
  const form = {};
  data.forEach(item => {
    form[item.prop] = isDef(item.default) ? item.default : '';
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

exports.formatForm = formatForm;
exports.formatRules = formatRules;
