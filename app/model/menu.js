'use strict';

// 导航目录

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('menus', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    code: {
      type: STRING(255),
      defaultValue: '',
    },

    path: {
      type: STRING(255),
      defaultValue: '',
    },

    children: {
      type: JSON,
      defaultValue: [],
    },

    enable: {
      type: BOOLEAN,
      defaultValue: true,
    },
  });

  return Model;
};

