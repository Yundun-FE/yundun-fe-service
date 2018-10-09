'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Build = app.model.define('builds', {
    title: {
      type: STRING(255),
      allowNull: false,
    },
    url: {
      type: STRING(255),
      allowNull: false,
    },
    type: {
      type: STRING(255),
      allowNull: false,
    },
    show: {
      type: BOOLEAN,
      defaultValue: true,
    },
    index: {
      type: INTEGER,
      defaultValue: 0,
    },
  });

  return Build;
};
