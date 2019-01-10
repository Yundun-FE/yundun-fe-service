'use strict';

const TYPE = {
  0: '默认',
  1: '主提示',
  2: '',
};

// 品牌表
module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('descriptions', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    code: {
      type: STRING(255),
      allowNull: false,
    },

    type: {
      type: INTEGER,
      defaultValue: 0,
    },

    content: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },

    translate: {
      type: JSON,
      defaultValue: {},
    },

    appid: {
      type: INTEGER,
      defaultValue: 0,
    },
  });

  return Model;
};