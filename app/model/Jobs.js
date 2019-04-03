'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON, DATE } = app.Sequelize;

  const Model = app.model.define('jobs', {
    title: {
      type: STRING(255),
      allowNull: true,
    },

    url: {
      type: STRING(255),
      defaultValue: '',
    },

    env: {
      type: STRING(255),
      defaultValue: 'root',
    },

    name: {
      type: STRING(255),
      defaultValue: '',
    },

    productId: {
      type: STRING(255),
      defaultValue: '',
    },

    productName: {
      type: STRING(255),
      defaultValue: '',
    },

    jenkinsUrl: {
      type: STRING(255),
      defaultValue: '',
    },

    tags: {
      type: JSON,
      defaultValue: [],
    },

    status: {
      type: INTEGER,
      defaultValue: 0,
    },

    menus: {
      type: JSON,
      allowNull: true,
    },

    setting: {
      type: JSON,
      defaultValue: {},
    },

    settings: {
      type: JSON,
      allowNull: false,
    },

    assets: {
      type: JSON,
      allowNull: true,
    },

    commands: {
      type: JSON,
      allowNull: true,
    },

    proxy: {
      type: JSON,
      allowNull: true,
    },

    options: {
      type: JSON,
      allowNull: true,
    },

    created_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'name' ],
      },
    ],
  });

  return Model;
};
