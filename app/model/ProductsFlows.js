'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE } = app.Sequelize;

  const Model = app.model.define('productsFlows', {
    sshUrl: {
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

    flows: {
      type: STRING(255),
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
