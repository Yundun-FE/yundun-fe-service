'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON, DATE } = app.Sequelize;

  const Model = app.model.define('jobs', {
    title: {
      type: STRING(255),
      allowNull: false,
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
      allowNull: false,
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
      allowNull: false,
    },

    commands: {
      type: JSON,
      allowNull: false,
    },

    proxy: {
      type: JSON,
      allowNull: false,
    },

    options: {
      type: JSON,
      allowNull: false,
    },

    created_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  });

  Model.associate = function() {
    Model.hasMany(app.model.Accounts, {
      foreignKey: 'jid',
    });
  };

  return Model;
};
