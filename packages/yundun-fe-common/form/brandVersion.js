const RULES = {
  name: {
    type: 'string',
    required: true,
    message: '请填写名称',
  },

  version: {
    type: 'string',
    required: true,
    message: '请填写版本',
  },

  data: {
    type: 'array',
    required: true,
    message: '请填写内容',
  },
};

const FORM = {
  name: '',
  version: '1.0',
  data: [],
};

module.exports = {
  FORM,
  RULES,
};
