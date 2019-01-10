const FORM = [
  {
    prop: 'name',
    label: '名称',
    placeholder: '名称',
    default: '',
    rules: {
      type: 'string',
      required: true,
      message: '请填写名称',
    },
  },
  {
    prop: 'version',
    label: '版本',
    default: '',
  },
  {
    prop: 'remarks',
    label: '备注',
    default: '',
  },
  {
    prop: 'menus',
    label: '目录',
    default: [],
  },
  {
    prop: 'settings',
    label: '配置',
    default: {},
  },
  {
    prop: 'translate',
    label: '翻译',
    default: {},
  },
];

const TABLE = [
  {
    prop: 'id',
    label: 'ID',
    minWidth: 80,
  },
  {
    prop: 'name',
    label: '名称',
    minWidth: 180,
  },
  {
    prop: 'version',
    label: '版本',
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
