'use strict'

const Service = require('egg').Service
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const cheerio = require('cheerio')

class ExecutorService extends Service {
  async add(item) {
    const { id, number } = item
    const data = await this.ctx.model.JobExecutor.findOne({ where: { number } })

    const ret = data ? '' : await this.ctx.model.JobExecutor.create(item)
    return ret
  }

  async getStatus() {
    const { jenkins } = this.app.config
    const list = await this.ctx.model.JobExecutor.findAll({
      where: { status: '' }
    })

    const nList = []
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      const { number, name } = item

      const { body } = await superagent.get(
        `${jenkins.url}/job/${name}/${number}/api/json?pretty=true`
      )

      const { timestamp, result, duration, estimatedDuration } = body

      const status = result ? result : ''
      const itemUpdate = {
        timestamp,
        status,
        duration,
        estimatedDuration
      }

      this.ctx.model.JobExecutor.update(itemUpdate, {
        where: {
          number,
          name
        }
      })

      Object.assign(item, itemUpdate)
      nList.push(item)
    }

    return nList
  }
}

module.exports = ExecutorService
