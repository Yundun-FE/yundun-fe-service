'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON, DATE } = app.Sequelize;

  const Model = app.model.define('productsVersions', {
    hash: {
      type: STRING(255),
      allowNull: false,
    },

    productId: {
      type: STRING(255),
      defaultValue: '',
    },

    productName: {
      type: STRING(255),
      allowNull: false,
    },

    number: {
      type: INTEGER,
      defaultValue: 0,
    },

    pages: {
      type: JSON,
      allowNull: false,
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
        fields: [ 'productId' ],
      },
      {
        fields: [ 'productName' ],
      },
      {
        unique: true,
        fields: [ 'hash' ],
      },
      {
        unique: true,
        fields: [ 'productName', 'number' ],
      },
    ],
  });

  return Model;
};
