'use strict';

// 品牌表
module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('appsPages', {
    name: {
      type: STRING(255),
      allowNull: false,
    },

    code: {
      type: STRING(255),
      defaultValue: '',
    },

    remarks: {
      type: STRING(255),
      defaultValue: '',
    },

    path: {
      type: STRING(255),
      defaultValue: '',
    },

    columns: {
      type: JSON,
      defaultValue: [],
    },

    columnsAgents: {
      type: JSON,
      defaultValue: [],
    },

    words: {
      type: JSON,
      defaultValue: [],
    },

    wordsAgents: {
      type: JSON,
      defaultValue: [],
    },

    settings: {
      type: JSON,
      defaultValue: [],
    },

    settingsAgents: {
      type: JSON,
      defaultValue: [],
    },

    translate: {
      type: JSON,
      defaultValue: {},
    },

    appId: {
      type: INTEGER,
      defaultValue: 0,
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'code' ],
      },
    ],
  });

  return Model;
};
