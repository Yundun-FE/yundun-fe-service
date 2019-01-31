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
  prop: 'url',
  default: '',
},
{
  prop: 'env',
  default: '',
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
  prop: 'menus',
  default: [
    {
      name: '',
      childrens: [],
    },
  ],
},
{
  prop: 'settings',
  default: {
    commands: [],
    assets: [],
    apps: [],
    builds: [],
  },
},
{
  prop: 'assets',
  default: {},
},

];

module.exports = {
  FORM,
};
