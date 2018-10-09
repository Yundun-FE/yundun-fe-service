'use strict';

const { Service } = require('egg');
const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
const cheerio = require('cheerio');
const moment = require('moment');

class JenkinsService extends Service {
  async jobsStart(name) {
    const { jenkins } = this.app.config;

    const ret = await superagent.post(`${jenkins.url}/job/${name}/build?delay=0sec`);
    return true;
  }
}

module.exports = JenkinsService;
