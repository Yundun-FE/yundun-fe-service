'use strict';

// 品牌版本库，用于代理商调用

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('brandsVersion', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    version: {
      type: STRING(255),
      allowNull: false,
    },

    data: {
      type: JSON,
      defaultValue: {},
    },
  });

  return Model;
};

