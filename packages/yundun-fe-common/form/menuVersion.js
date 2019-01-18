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

const TOOLBAR = [
  {
    label: '创建新目录',
    command: 'Create',
  },
  {
    label: '删除',
    command: 'Delete',
  },
  {
    components: 'InputSearch',
    align: 'right',
    props: {

    },
  },
  {
    icon: 'el-setting',
    align: 'right',
    command: 'Setting',
  },
];

const TABLE = [
  {
    prop: 'id',
    label: 'ID',
    width: 80,
  },
  {
    prop: 'name',
    label: '名称',
    minWidth: 180,
  },
  {
    prop: 'version',
    label: '版本',
    minWidth: 80,
  },
  {
    prop: 'remarks',
    label: '备注',
    minWidth: 180,
  },
  {
    label: '操作',
    action: [
      {
        type: 'dropdown',
        command: 'Edit',
        items: [
          {
            label: '克隆',
            command: 'Clone',
          },
          {
            label: '删除',
            command: 'Delete',
          },
        ],
      },
    ],
  },
];

module.exports = {
  FORM,
  TABLE,
};
