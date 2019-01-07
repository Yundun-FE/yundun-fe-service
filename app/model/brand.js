'use strict';

// 品牌表
module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('brands', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    code: {
      type: STRING(255),
      allowNull: false,
    },

    alias: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },

    theme: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
    },
  });

  return Model;
};
