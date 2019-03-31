'use strict';

module.exports = app => {
  const { INTEGER, BOOLEAN, STRING, JSON } = app.Sequelize;

  const Model = app.model.define('groups', {
    title: {
      type: STRING(255),
      defaultValue: '',
    },
    name: {
      type: STRING(255),
      allowNull: false,
    },
    description: {
      type: STRING(255),
      defaultValue: '',
    },
    rules: {
      type: JSON,
      allowNull: false,
    },
    settings: {
      type: JSON,
      allowNull: false,
    },
    private: {
      type: BOOLEAN,
      defaultValue: false,
    },
  });

  return Model;
};
