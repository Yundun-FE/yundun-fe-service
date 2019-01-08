const RULES = {
  name: {
    type: 'string',
    required: true,
    message: '请填写名称',
  },
  code: {
    type: 'string',
    required: true,
    message: '请填写CODE',
  },
  path: {
    type: 'string',
    required: true,
    message: '请填写路径',
  },
  children: {
    type: 'array',
    required: true,
  },
};

const FORM = {
  name: '',
  code: '',
  path: '',
  children: [],
  enable: true,
};

module.exports = {
  FORM,
  RULES,
};
