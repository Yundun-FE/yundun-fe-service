'use strict';

const TYPE = {
  0: '默认',
  1: '提示',
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

    content: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },

    type: {
      type: INTEGER,
      defaultValue: 0,
    },
  });

  return Model;
};
