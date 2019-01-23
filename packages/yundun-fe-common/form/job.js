const FORM = [{
  prop: 'name',
  label: '名称',
  default: '',
  rules: {
    type: 'string',
    required: true,
    message: '请填写名称',
  },
},
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
  prop: 'status',
  default: 0,
},
{
  prop: 'setting',
  default: [],
},
{
  prop: 'assets',
  default: {},
},

];

const LABEL = {
  status: {

  },
};

module.exports = {
  FORM,
  LABEL,
};
