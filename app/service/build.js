const { Service } = require('egg')
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const cheerio = require('cheerio')
const moment = require('moment')

class BuildService extends Service {
  async getJobs() {
    const { jenkins } = this.app.config

    const ret = await superagent.get(`${jenkins.url}`)
    const $ = cheerio.load(ret.text)

    const list = $('#projectstatus>tbody>tr')
    const listJobs = []

    list.each((index, item) => {
      item = $(item)

      const props = item
        .find('.model-link')
        .text()
        .split('#')

      let [name, numberSuccerr = 0, numberFail = 0] = props

      numberSuccerr = parseInt(numberSuccerr)
      numberFail = parseInt(numberFail)

      const number = numberSuccerr > numberFail ? numberSuccerr : numberFail
      if (!name) return

      const itemJobs = { name, numberSuccerr, numberFail, number }
      listJobs.push(itemJobs)
    })

    return listJobs
  }

  async getProgress() {
    const { jenkins } = this.app.config

    const ret = await superagent.get(`${jenkins.url}/ajaxExecutors`)
    const $ = cheerio.load(ret.text)

    const list = $('.row.pane-content>table>tbody>tr')

    const listProgress = []
    list.each((index, item) => {
      item = $(item)

      let name = item.find('.pane a').attr('href')
      let progress = item.find('.progress-bar-done').attr('style')
      let number = item
        .find('.pane a')
        .eq(1)
        .text()

      name = name ? name.split('/')[2] : null
      progress = progress ? parseInt(progress.replace(/[^0-9]/gi, '')) : null
      number = parseInt(number.replace('#', ''))

      if (!name || !progress) return

      const itemProgress = {
        name,
        progress,
        utime: moment().format('X'),
        number
      }

      listProgress.push(itemProgress)
    })

    listProgress.forEach(item => {
      this.ctx.service.executor.add(item)
      this.ctx.model.Progress.create(item)
    })

    this.ctx.service.executor.getStatus()

    return listProgress
  }
}

module.exports = BuildService
