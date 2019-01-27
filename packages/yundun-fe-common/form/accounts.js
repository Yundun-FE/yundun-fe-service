const FORM = [
  {
    prop: 'title',
    label: '标题',
    default: '',
    rules: {
      type: 'string',
      required: true,
      message: '请填写标题',
    },
  },
  {
    prop: 'name',
    label: '名称',
    default: '',
    rules: {
      type: 'string',
      required: true,
      message: '请填写账号',
    },
  },
  {
    prop: 'password',
    label: '密码',
    default: '',
    rules: {
      type: 'string',
      required: true,
      message: '请填写密码',
    },
  },
];


module.exports = {
  FORM,
};
