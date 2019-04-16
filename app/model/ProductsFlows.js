'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

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
  });

  return Model;
};
