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
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('appsPages', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    code: {
      type: STRING(255),
      defaultValue: '',
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

    content: {
      type: JSON,
      defaultValue: {},
    },

    words: {
      type: JSON,
      defaultValue: [],
    },

    wordsAgents: {
      type: JSON,
      defaultValue: [],
    },

    settings: {
      type: JSON,
      defaultValue: [],
    },

    settingsAgents: {
      type: JSON,
      defaultValue: [],
    },

    translate: {
      type: JSON,
      defaultValue: {},
    },

    appId: {
      type: INTEGER,
      defaultValue: 0,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'code' ],
      },
    ],
  });

  return Model;
};
