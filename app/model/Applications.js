'use strict';
const moment = require('moment');

// 应用表
module.exports = app => {
  const {
    INTEGER,
    STRING,
    BOOLEAN,
    JSON,
    DATE,
  } = app.Sequelize;

  const Model = app.model.define('applications', {
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
      defaultValue: '',
    },

    theme: {
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

    status: {
      type: INTEGER,
      defaultValue: 0,
    },

    translate: {
      type: JSON,
      defaultValue: {},
    },
  }, {
    getterMethods: {
      createdAt() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
      updatedAt() {
        return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  });

  return Model;
};
