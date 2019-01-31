'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('pages', {
    name: {
      type: STRING(255),
      allowNull: false,
    },
    alias: {
      type: STRING(255),
      defaultValue: '',
    },
    content: {
      type: JSON,
      allowNull: false,
    },
    settings: {
      type: JSON,
      allowNull: false,
    },
    translations: {
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
Object -> 合并 -> merge

settings: {
  columns: [
    {
      name: '', ###
      componentName: '',
      props: {
        width: '',
        minWidth: '',
      }
    }
  ]
  actions: {
    left: [
      {
        name: '', ###
        command: 'Edit', ###
        title: '编辑',
        type: 'primary',
        children: [
          {
            ...
          }
        ]
      }
    ],
    right: []
  },
  blocks: [
    {
      name: '', ###
      props: {

      }
    }
  ]
}

translate: {
  'en-Us': {

  }
}

settings =  {
  'columns.name.props.label': '名称',
  'columns.name.props.width': '100',
  'columns.name.props.minWidth': '120',
  'actions.left.create.label': 'sfd',
}

contents: {
  columns: {
    [name]: {
      title: 'XXX',
      show: 'true',
      size: '',
      props: {
        sdf: 'dsf'
      }
    }
  },
  actions: {
    left: {
      sd: {
        show: false,
        label: 'sdf',
        children: {
          Musd: {
            show: false,
            label: sdf
          }
        }
      }
    }
  }
}

blocks: {
  ijiosf: {

  }

}
*/
