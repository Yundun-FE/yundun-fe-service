'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Product = app.model.define('products', {
    name: {
      type: STRING(255),
      allowNull: false,
    },
    title: {
      type: STRING(255),
      defaultValue: '',
    },
    avatar: {
      type: STRING(255),
      defaultValue: '',
    },
    url: {
      type: STRING(255),
      defaultValue: '',
    },
    version: {
      type: STRING(255),
      defaultValue: '0.0.1',
    },
    description: {
      type: STRING(255),
      defaultValue: '',
    },
    assetsGroups: {
      type: JSON,
      allowNull: false,
    },
    settingsGroups: {
      type: JSON,
      allowNull: false,
    },
    themesGroups: {
      type: JSON,
      allowNull: false,
    },
    proxysGroups: {
      type: JSON,
      allowNull: false,
    },
    applicationsIds: {
      type: JSON,
      allowNull: false,
    },
  });

  return Product;
};
