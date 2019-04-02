'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('jobsDeploys', {
    jobId: {
      type: STRING(255),
      defaultValue: '',
    },

    version: {
      type: STRING(255),
      defaultValue: '0.0.1',
    },

    content: {
      type: JSON,
      defaultValue: [],
    },
  });
  return Model;
};
