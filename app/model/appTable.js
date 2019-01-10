'use strict';

// 表格
module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('appsTables', {
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

    columns: {
      type: JSON,
      defaultValue: [],
    },

    translate: {
      type: JSON,
      defaultValue: {},
    },
  });

  return Model;
};
