'use strict';

// 选项表
module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('appsLabels', {
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

    items: {
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
