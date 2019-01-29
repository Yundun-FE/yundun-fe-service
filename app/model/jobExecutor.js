'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE, JSON } = app.Sequelize;

  const Model = app.model.define('jobsExecutors', {
    number: {
      type: INTEGER,
      allowNull: false,
    },
    status: {
      type: STRING(255),
      defaultValue: '',
    },
    duration: {
      type: INTEGER,
      defaultValue: 0,
    },
    estimatedDuration: {
      type: INTEGER,
      defaultValue: 0,
    },
    userName: {
      type: STRING(255),
      defaultValue: '',
    },
    userEmail: {
      type: STRING(255),
      defaultValue: '',
    },
    commits: {
      type: JSON,
      defaultValue: '[]',
    },
    name: {
      type: STRING(255),
      allowNull: false,
    },
    config: {
      type: JSON,
      defaultValue: '',
    },
    timestamp: DATE,
  });

  return Model;
};
