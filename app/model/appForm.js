'use strict';

// 表单管理
module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('appsForm', {
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

    forms: {
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
