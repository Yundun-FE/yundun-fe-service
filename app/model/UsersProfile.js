'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('usersProfile', {
    fullname: {
      type: STRING(255),
      defaultValue: '',
    },
    job: {
      type: STRING(255),
      defaultValue: '',
    },
    bio: {
      type: STRING(255),
      defaultValue: '',
    },
    company: {
      type: STRING(255),
      defaultValue: '',
    },
    location: {
      type: STRING(255),
      defaultValue: '',
    },
    sex: {
      type: INTEGER,
      defaultValue: '',
    },
    url: {
      type: STRING(255),
      defaultValue: '',
    },
    birthday: {
      type: STRING(255),
      defaultValue: '',
    },
  });

  return Model;
};
