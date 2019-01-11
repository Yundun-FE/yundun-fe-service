'use strict';

// 商户表

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('agents', {
    name: {
      type: STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    code: {
      type: STRING(255),
      allowNull: false,
    },

    website: {
      type: STRING(255),
      defaultValue: '',
    },

    assets: {
      type: JSON,
      defaultValue: {},
    },

    brandId: {
      type: INTEGER,
      defaultValue: 0,
    },

    menuId: {
      type: INTEGER,
      defaultValue: 0,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'name' ],
      },
      {
        unique: true,
        fields: [ 'code' ],
      },
    ],
  });

  return Model;
};

