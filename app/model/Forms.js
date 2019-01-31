'use strict';

module.exports = app => {
  const { INTEGER, STRING, JSON } = app.Sequelize;

  const Model = app.model.define('forms', {
    title: {
      type: STRING(255),
      defaultValue: '',
    },
    name: {
      type: STRING(255),
      allowNull: false,
    },
    forms: {
      type: JSON,
      allowNull: false,
    },
    rules: {
      type: JSON,
      allowNull: false,
    },
    settings: {
      type: JSON,
      allowNull: false,
    },
  });

  return Model;
};
