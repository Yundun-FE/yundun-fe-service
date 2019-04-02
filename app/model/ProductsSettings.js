'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const ProductSettings = app.model.define('productsSettings', {
    productId: {
      type: STRING(255),
      allowNull: false,
    },
    name: {
      type: STRING(255),
      allowNull: false,
    },
    title: {
      type: STRING(255),
      defaultValue: '',
    },
    remarks: {
      type: STRING(255),
      defaultValue: '',
    },
    settings: {
      type: JSON,
      allowNull: false,
    },
  });

  return ProductSettings;
};
