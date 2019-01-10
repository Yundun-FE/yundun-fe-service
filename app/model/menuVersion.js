'use strict';

// 目录版本库，用于代理商调用

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('menusVersion', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    version: {
      type: STRING(255),
      allowNull: false,
    },

    remarks: {
      type: STRING(255),
      defaultValue: '',
    },

    menus: {
      type: JSON,
      defaultValue: [],
    },

    settings: {
      type: JSON,
      defaultValue: {},
    },

    translate: {
      type: JSON,
      defaultValue: {},
    },
  });

  return Model;
};

