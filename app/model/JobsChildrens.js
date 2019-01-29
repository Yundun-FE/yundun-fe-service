'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('jobsChildrens', {
    url: {
      type: STRING(255),
      defaultValue: '',
    },

    env: {
      type: STRING(255),
      defaultValue: 'default',
    },

    menus: {
      type: JSON,
      defaultValue: [],
    },

    assets: {
      type: JSON,
      defaultValue: {},
    },
  });
  return Model;
};
