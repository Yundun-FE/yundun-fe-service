const FORM = [
  {
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
    prop: 'remarks',
    default: '',
  },
  {
    prop: 'path',
    default: '',
  },
  {
    prop: 'columns',
    default: [
      {
        label: '',
        prop: '',
      },
    ],
  },
  {
    prop: 'words',
    default: [
      {
        label: '',
        value: '',
        valueOem: '',
      },
    ],
  },
  {
    prop: 'settings',
    default: [
      {
        label: '',
        value: '',
        valueOem: '',
        remarks: '',
      },
    ],
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

const TABLE = [
  {
    prop: 'name',
    label: '名称',
    minWidth: 180,
  },
  {
    prop: 'code',
    label: 'CODE',
    minWidth: 180,
  },
  {
    prop: 'agentName',
    label: '用户',
    minWidth: 180,
  },
  {
    prop: 'remarks',
    label: '备注',
    minWidth: 180,
  },
];

module.exports = {
  FORM,
  TABLE,
};
