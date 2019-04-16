'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE } = app.Sequelize;

  const Model = app.model.define('flows', {
    devopsId: {
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

    tasks: {
      type: JSON,
      allowNull: false,
    },

    email: {
      type: STRING(255),
      defaultValue: '',
    },

    avatarUrl: {
      type: STRING(255),
      defaultValue: '',
    },

    commitHash: {
      type: JSON,
      allowNull: false,
    },

    commitMessage: {
      type: STRING(255),
      defaultValue: '',
    },

    commitDate: {
      type: JSON,
      allowNull: false,
    },

    duration: {
      type: INTEGER,
      defaultValue: 0,
    },

    status: {
      type: INTEGER,
      defaultValue: 0, // 1: SUCCESS  2: FAIL
    },

    created_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },

    updated_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }, {
    indexes: [
      {
        fields: [ 'devopsId' ],
      },
      {
        fields: [ 'author' ],
      },
      {
        fields: [ 'email' ],
      },
      {
        fields: [ 'productId' ],
      },
      {
        fields: [ 'productName' ],
      },
    ],
  });

  return Model;
};
