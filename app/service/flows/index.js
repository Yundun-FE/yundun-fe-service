'use strict';

const Service = require('egg').Service;

class IndexService extends Service {
  async echo() {

  }

  async getByName() {
    return {
      name: 'console-v6',
      stages: [
        {
          name: 'console-v6-web-build',
          title: '编译项目',
          data: {
            productName: 'console-v6-web',
            buildNumber: 0,


            jenkinsUrl: 'http://172.16.100.40:8080/view/console-v6/job/console-v6-yundun',
          },
        },
      ],
    };
  }
}

module.exports = IndexService;
