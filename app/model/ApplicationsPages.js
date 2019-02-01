'use strict';

const APP_PAGE_TYPE = [
  {
    label: '通用',
    value: 0,
  },
  {
    label: '列表页',
    value: 1,
  },
  {
    label: '编辑页',
    value: 2,
  },
  {
    label: '弹框',
    value: 3,
  },
  {
    label: '控制台',
    value: 4,
  },
  {
    label: '配置页',
    value: 5,
  },
];

// 页面
module.exports = app => {
  const { INTEGER, STRING, JSON } = app.Sequelize;

  const Model = app.model.define('applicationsPages', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    code: {
      type: STRING(255),
      defaultValue: '',
    },

    env: {
      type: STRING(255),
      defaultValue: 'root',
    },

    type: {
      type: INTEGER,
      defaultValue: 0,
    },

    remarks: {
      type: STRING(255),
      defaultValue: '',
    },

    path: {
      type: STRING(255),
      defaultValue: '',
    },

    blocks: {
      type: JSON,
      allowNull: false,
    },

    content: {
      type: JSON,
      allowNull: false,
    },

    settings: {
      type: JSON,
      allowNull: false,
    },

    translations: {
      type: JSON,
      allowNull: false,
    },

    appId: {
      type: INTEGER,
      defaultValue: 0,
    },
  }, {
    indexes: [
      {
        fields: [ 'code' ],
      },
    ],
  });

  return Model;
};
