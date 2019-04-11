'use strict';
const moment = require('moment');

// git commit
module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON, DATE } = app.Sequelize;

  const Model = app.model.define('repositorysCommits', {
    sha: {
      type: STRING(255),
      defaultValue: '',
    },

    sshUrl: {
      type: STRING(255),
      defaultValue: '',
    },

    author: {
      type: STRING(255),
      defaultValue: '',
    },

    email: {
      type: STRING(255),
      defaultValue: '',
    },

    avatarUrl: {
      type: STRING(255),
      defaultValue: '',
    },

    message: {
      type: STRING(255),
      defaultValue: '',
    },

    commit: {
      type: JSON,
      allowNull: false,
    },

    commitDate: {
      type: DATE,
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
        fields: [ 'author' ],
      },
      {
        fields: [ 'email' ],
      },
      {
        fields: [ 'sshUrl' ],
      },
    ],
  });

  return Model;
};
