'use strict';

// 弹框管理
module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('appsDialogs', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    code: {
      type: STRING(255),
      defaultValue: '',
    },

    words: {
      type: JSON,
      defaultValue: [],
    },

    labelIds: {
      type: JSON,
      defaultValue: [],
    },

    formId: {
      type: INTEGER,
      defaultValue: 0,
    },

    translate: {
      type: JSON,
      defaultValue: {},
    },
  });

  return Model;
};
