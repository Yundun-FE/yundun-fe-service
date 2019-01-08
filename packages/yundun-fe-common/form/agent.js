const RULES = {
  name: {
    type: 'string',
    required: true,
    message: '请填写名称',
  },
};

const FORM = {
  name: '',
  website: '',
  assets: {},
  brandId: 0,
  menuId: 0,
};

module.exports = {
  FORM,
  RULES,
};
