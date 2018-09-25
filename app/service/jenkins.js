'use strict'

const { Service } = require('egg')
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const cheerio = require('cheerio')
const moment = require('moment')

class JenkinsService extends Service {
  async jobsStart(name) {
    const { jenkins } = this.app.config

    const dataProgress = await this.service.build.getProgress()

    if (dataProgress) {
      if(dataProgress.find(_ => _.name === name)) {
        return ['onBuilding']
      }
    }


    const ret = await superagent.post(`${jenkins.url}/job/${name}/build?delay=0sec`)

    console.log(ret.body)
    return [null, 'success']

  }
}

module.exports = JenkinsService
