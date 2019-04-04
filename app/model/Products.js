'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON, DATE } = app.Sequelize;

  const Model = app.model.define('products', {
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

    settings: {
      type: JSON,
      allowNull: false,
    },

    settingsOrder: {
      type: JSON,
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
        unique: true,
        fields: [ 'name' ],
      },
      {
        fields: [ 'title' ],
      },
    ],
  });

  return Model;
};
