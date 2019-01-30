'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('pages', {
    name: {
      type: STRING(255),
      allowNull: false,
    },
    alias: {
      type: STRING(255),
      defaultValue: '',
    },
    content: {
      type: JSON,
      defaultValue: '{}',
    },
    type: {
      type: STRING(255),
      defaultValue: '',
    },
  });

  return Model;
};
