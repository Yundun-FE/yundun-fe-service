const FORM = [{
  prop: 'name',
  default: '',
  rules: {
    type: 'string',
    required: true,
    message: '请填写名称',
  },
},
{
  prop: 'code',
  rules: {
    type: 'string',
    required: true,
    message: '请填写CODE',
  },
},
{
  prop: 'env',
  default: '',
},
{
  prop: 'type',
  default: 0,
},
{
  prop: 'remarks',
  default: '',
},
{
  prop: 'path',
  default: '',
},
{
  prop: 'content',
  default: {},
},
{
  prop: 'words',
  default: [{
    label: '',
    value: '',
    valueOem: '',
  }],
},
{
  prop: 'settings',
  default: {},
},
{
  prop: 'translations',
  default: {},
},
{
  prop: 'appId',
  default: 0,
},
{
  prop: 'agentId',
  default: 0,
},
];

module.exports = {
  FORM,
};
