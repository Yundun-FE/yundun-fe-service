'use strict';

const TYPE = {
  0: '默认',
  1: '提示',
};

// 品牌表
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

    remarks: {
      type: STRING(255),
      defaultValue: '',
    },

    path: {
      type: STRING(255),
      defaultValue: '',
    },

    words: {
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

    layout: {
      type: JSON,
      defaultValue: {},
    },
  });

  return Model;
};
