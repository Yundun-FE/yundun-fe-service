// const FORM = {
//   name: '',
//   website: '',
//   assets: {},
//   brandId: 0,
//   menuId: 0,
// };

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
    prop: 'website',
    default: '',
  },
  {
    prop: 'assets',
    default: [],
    defaultRow: {
      key: '',
      label: '',
      value: '',
    },
  },
  {
    prop: 'brandId',
    default: 0,
  },
  {
    prop: 'menuId',
    default: 0,
  },
];


module.exports = {
  FORM,
};
