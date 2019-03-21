'use strict';
const moment = require('moment');

// 应用版本
module.exports = app => {
  const {
    INTEGER,
    STRING,
    BOOLEAN,
    JSON,
    DATE,
  } = app.Sequelize;

  const Model = app.model.define('applicationsVersions', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    version: {
      type: STRING(255),
      defaultValue: '0.0.1',
    },

    commit: {
      type: STRING(255),
      allowNull: false,
    },

    branch: {
      type: STRING(255),
      allowNull: false,
    },

    gitData: {
      type: JSON,
      allowNull: false,
    },

    author: {
      type: STRING(255),
      allowNull: false,
    },

    remark: {
      type: STRING(255),
      allowNull: false,
    },
    // 是否已发布
    deploy: {
      type: BOOLEAN,
      defaultValue: false,
    },
    // 资源集合
    assets: {
      type: JSON,
      allowNull: false,
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
