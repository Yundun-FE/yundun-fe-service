'use strict'

const Service = require('egg').Service
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))

class ExecutorService extends Service {
  async add(item) {
    const { id, number, name } = item
    // const data = await this.ctx.model.JobExecutor.findOne({ where: { number, name } })

    // if (data) {
    //   return false
    // } else {
    //   await this.ctx.model.JobExecutor.create(item)
    //   return item
    // }

    const data = await this.ctx.model.JobExecutor.update(item, {
      where: { number, name }
    })

    if (!data) {
      await this.ctx.model.JobExecutor.findOne({ where: { number, name } })
    }
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

      await this.ctx.model.JobExecutor.update(itemUpdate, {
        where: {
          number,
          name
        }
      })

      Object.assign(item, itemUpdate)
      nList.push(item)
    }

    await this.ctx.service.client.addNotice(nList)

    console.log('EXECUTOR UPDATED')

    return nList
  }
}

module.exports = ExecutorService
