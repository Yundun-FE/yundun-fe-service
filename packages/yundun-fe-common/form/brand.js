const RULES = {
  name: {
    type: 'string',
    required: true,
    message: '请填写名称',
  },
};

const FORM = {
  name: '',
  code: '',
};

module.exports = {
  FORM,
  RULES,
};
