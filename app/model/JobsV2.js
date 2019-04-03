'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON, DATE } = app.Sequelize;

  const Model = app.model.define('jobsV2', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    title: {
      type: STRING(255),
      defaultValue: '',
    },

    productId: {
      type: INTEGER,
      allowNull: false,
    },

    productName: {
      type: STRING(255),
      allowNull: false,
    },

    jenkinsUrl: {
      type: STRING(255),
      defaultValue: '',
    },

    settings: {
      type: JSON,
      allowNull: false,
    },

    created_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }, {
    freezeTableName: true,

    indexes: [
      {
        unique: true,
        fields: [ 'name' ],
      },
    ],
  });

  return Model;
};
