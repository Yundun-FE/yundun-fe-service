'use strict';
const moment = require('moment');

// 仓库绑定 / 流程定义
module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, JSON, DATE } = app.Sequelize;

  const Model = app.model.define('productsRepository', {
    title: {
      type: STRING(255),
      defaultValue: '',
    },

    productId: {
      type: STRING(255),
      allowNull: false,
    },


    tasks: {
      type: JSON,
      allowNull: false,
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
        fields: [ 'productId' ],
      },
    ],
  });

  return Model;
};

/*
{
  "parsed_yaml": [
    {
      "name": "测试阶段",
      "tasks": {
        "默认测试任务": {
          "allow_failure": null,
          "context": { "path": null },
          "dependencies": null,
          "except": {},
          "image": "ubuntu:16.04",
          "job_type": "test",
          "label": "develop",
          "name": "默认测试任务",
          "only": { "branches": [".*"], "tags": [".*"] },
          "pull_request": null,
          "script": ["echo This is a default test."],
          "stage": "测试阶段"
        }
      }
    },
    {
      "name": "构建阶段",
      "tasks": {
        "默认构建任务": {
          "allow_failure": null,
          "build_dir": "/",
          "cache": true,
          "dependencies": null,
          "dockerfile_path": "/Dockerfile",
          "except": {},
          "job_type": "image_build",
          "label": "release-image",
          "name": "默认构建任务",
          "only": { "branches": [".*"], "tags": [".*"] },
          "pull_request": null,
          "stage": "构建阶段"
        }
      }
    },
    { "name": "发布阶段", "tasks": {} }
  ],
  "global_var": {},
  "raw_yaml": "version: 3\nstages:\n- 测试阶段\n- 构建阶段\n- 发布阶段\n默认构建任务:\n  label: release-image\n  stage: 构建阶段\n  job_type: image_build\n  only:\n    branches:\n    - .*\n    tags:\n    - .*\n  build_dir: /\n  cache: true\n  dockerfile_path: /Dockerfile\n默认测试任务:\n  label: develop\n  stage: 测试阶段\n  job_type: test\n  only:\n    branches:\n    - .*\n    tags:\n    - .*\n  image: ubuntu:16.04\n  script:\n  - echo This is a default test.\n"
}

*/
