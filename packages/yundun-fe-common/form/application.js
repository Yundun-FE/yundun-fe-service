const FORM = [
  {
    prop: 'name',
    label: '名称',
    placeholder: '名称',
    default: '',
    width: '220px',
    rules: {
      type: 'string',
      required: true,
      message: '请填写名称',
    },
  },
  {
    prop: 'code',
    label: 'CODE',
    placeholder: 'CODE',
    default: '',
    width: '220px',
    rules: {
      type: 'string',
      required: true,
      message: '请填写CODE',
    },
  },
  {
    prop: 'menus',
    default: [
      {
        name: '',
        path: '/',
      },
    ],
  },
  {
    prop: 'settings',
    default: {
    },
  },
  {
    prop: 'status',
    label: '是否启用',
    default: 0,
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
