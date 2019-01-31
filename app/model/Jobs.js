'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

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
      defaultValue: [],
    },

    setting: {
      type: JSON,
      defaultValue: {},
    },

    settings: {
      type: JSON,
      defaultValue: {},
    },

    assets: {
      type: JSON,
      defaultValue: {},
    },
  });

  Model.associate = function() {
    Model.hasMany(app.model.Accounts, {
      foreignKey: 'jid',
    });
  };

  return Model;
};
