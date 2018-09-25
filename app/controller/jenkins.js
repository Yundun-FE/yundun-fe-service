'use strict'

const Service = require('egg').Service

class ServiceService extends Service {
  async jobs() {
    const data = await this.service.build.getJobs()
    this.ctx.body = data
  }

  async jobsStart() {
    const { id } = this.ctx.params

    const [err, message] = await this.service.jenkins.jobsStart(id)

    if (err) {
      this.ctx.body = {
        err,
        message: err
      }
      return
    }
    this.ctx.body = {
      message
    }
  }
}

module.exports = ServiceService
