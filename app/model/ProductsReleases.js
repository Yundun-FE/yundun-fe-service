'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE, JSON } = app.Sequelize;

  const Model = app.model.define('productsReleases', {
    productId: {
      type: STRING(255),
      defaultValue: '',
    },

    productName: {
      type: STRING(255),
      allowNull: false,
    },

    buildHost: {
      type: STRING(255),
      allowNull: false,
    },

    number: {
      type: INTEGER,
      allowNull: false,
    },

    pages: {
      type: JSON,
      allowNull: false,
    },

    content: {
      type: JSON,
      allowNull: false,
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
  });

  return Model;
};
