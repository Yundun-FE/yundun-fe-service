'use strict';

module.exports = app => {
  const { INTEGER, BOOLEAN, STRING, JSON } = app.Sequelize;

  const Model = app.model.define('groupsUsers', {
    groupId: {
      type: STRING(255),
      defaultValue: '',
    },
    userId: {
      type: STRING(255),
      allowNull: false,
    },
  });

  return Model;
};
