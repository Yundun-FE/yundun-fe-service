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
  prop: 'remarks',
  default: '',
},
{
  prop: 'path',
  default: '',
},
{
  prop: 'columns',
  default: [{
    label: '',
    prop: '',
  }],
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
  default: [{
    label: '',
    value: '',
    valueOem: '',
    remarks: '',
  }],
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

const TABLE = {
  columns: [{
    props: {
      prop: 'name',
      label: '名称',
      minWidth: 180,
    },
  },
  {
    props: {
      prop: 'code',
      label: 'CODE',
      minWidth: 180,
    },
  },
  {
    props: {
      prop: 'agentName',
      label: '用户',
      minWidth: 180,
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
        label: '创建新页面',
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
        toPage: true,
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
