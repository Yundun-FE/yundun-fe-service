const FORM = {
  title: {
    rules: {
      required: true,
      message: '请填写标题',
    },
  },
  name: {
    rules: {
      required: true,
      message: '请填写名称',
    },
  },
  forms: {
    default: [],
    rules: {
      type: 'array',
    },
  },
  rules: {
    default: {},
    rules: {
      type: 'object',
    },
  },
  settings: {
    default: {},
    rules: {
      type: 'object',
    },
  },
};


const CHILDRENS = {
  type: {
    rules: {
      required: true,
    },
  },
  title: {
    rules: {
      required: true,
    },
  },
  props: {
    rules: {
      type: 'object',
    },
  },
  formsProps: {

  },
};

const forms_item = {
  title: {
    rules: {
    },
  },
  props: 'FORMS_PROPS',
};


const FORMS_PROPS = {
  span: {
    rules: {
      type: 'number',
    },

  },
};

module.exports = {
  FORM,
};
