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
      defaultValue: 'default',
    },

    name: {
      type: STRING(255),
      defaultValue: '',
    },

    show: {
      type: BOOLEAN,
      defaultValue: true,
    },

    index: {
      type: INTEGER,
      defaultValue: 0,
    },

    tags: {
      type: JSON,
      defaultValue: [],
    },

    status: {
      type: INTEGER,
      default: 0,
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

  return Model;
};
