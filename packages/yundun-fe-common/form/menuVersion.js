const FORM = [{
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

const TABLE = {
  columns: [{
    props: {
      prop: 'id',
      label: 'ID',
      width: 80,
    },
  },
  {
    props: {
      prop: 'name',
      label: '名称',
      minWidth: 180,
    },
  },
  {
    props: {
      prop: 'version',
      label: '版本',
      minWidth: 80,
    },
  },
  {
    props: {
      prop: 'remarks',
      label: '备注',
      minWidth: 180,
    },
  },
  {
    componentName: 'ColumnAction',
    props: {
      label: '操作',
      width: 140,
      align: 'right',
    },
  },
  ],
  actions: {
    toolbar: {
      list: [{
        label: '创建新目录',
        command: 'Create',
        type: 'primary',
      }],
      search: {
        label: '搜索',
        command: 'Search',
        align: 'right',
      },
    },
    multiple: {
      list: [{
        label: '删除',
        command: 'Delete',
      }],
    },
    row: {
      list: [{
        label: '编辑',
        command: 'Edit',
        items: [{
          label: '克隆',
          command: 'Clone',
        },
        {
          label: '删除',
          command: 'Delete',
          confirm: true,
        },
        ],
      }],
    },
  },
};

module.exports = {
  FORM,
  TABLE,
};
