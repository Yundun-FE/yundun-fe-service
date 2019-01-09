const FORM = [
  {
    prop: 'name',
    label: '名称',
    placeholder: '名称',
    default: '',
    components: 'el-input',
    width: '220px',
    rules: {
      type: 'string',
      required: true,
      message: '请填写名称',
    },
  },
  {
    prop: 'path',
    label: '路径',
    placeholder: '路径',
    default: '',
    components: 'el-input',
    width: '220px',
    rules: {
      type: 'string',
      required: true,
      message: '请填写路径',
    },
  },
  {
    prop: 'code',
    label: 'CODE',
    placeholder: 'CODE',
    default: '',
    components: 'el-input',
    width: '220px',
    rules: {
      type: 'string',
      required: true,
      message: '请填写CODE',
    },
  },
  {
    prop: 'enable',
    label: '是否启用',
    default: true,
    components: 'el-switch',
  },
  {
    prop: 'children',
    label: '是否启用',
    default: [],
  },
];

const TABLE = [
  {
    prop: 'name',
    label: '名称',
    minWidth: 180,
  },
  {
    prop: 'path',
    label: '路径',
    minWidth: 180,
  },
  {
    prop: 'code',
    label: 'CODE',
    minWidth: 180,
  },
];

module.exports = {
  FORM,
  TABLE,
};
