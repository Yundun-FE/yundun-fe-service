'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON } = app.Sequelize;

  const Model = app.model.define('blocks', {
    name: {
      type: STRING(255),
      allowNull: false,
    },
    alias: {
      type: STRING(255),
      defaultValue: '',
    },
    remarks: {
      type: STRING(255),
      defaultValue: '',
    },
    parentId: {
      type: STRING(255),
      allowNull: false,
    },
    content: {
      type: JSON,
      allowNull: false,
    },
    type: {
      type: STRING(255),
      defaultValue: '',
    },
  });

  return Model;
};


/*

// table-curd
{
  columns: [

  ],
  actions: [

  ]
}

// form
{
  form: {

  },
  layout: {

  }
}
// charts

{
  settings: {},
  options: {}
}

*/
