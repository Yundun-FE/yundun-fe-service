'use strict';

module.exports = app => {
  const { INTEGER, STRING, JSON } = app.Sequelize;

  const Model = app.model.define('jobsDeploys', {
    jobName: {
      type: STRING(255),
      allowNull: false,
    },

    jobId: {
      type: STRING(255),
      allowNull: false,
    },

    productId: {
      type: STRING(255),
      allowNull: false,
    },

    productName: {
      type: STRING(255),
      allowNull: false,
    },

    number: {
      type: INTEGER,
      defaultValue: 1,
    },

    content: {
      type: JSON,
      allowNull: false,
    },

    settings: {
      type: JSON,
      allowNull: false,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'jobName', 'number' ],
      },
      {
        unique: true,
        fields: [ 'jobId', 'number' ],
      },
    ],
  });
  return Model;
};
