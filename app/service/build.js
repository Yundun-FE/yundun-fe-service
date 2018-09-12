const { Service } = require('egg')
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const cheerio = require('cheerio')
const moment = require('moment')

class BuildService extends Service {
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
      let pid = item.find('.pane a').eq(1).text()

      name = name ? name.split('/')[2] : null
      progress = progress ? parseInt(progress.replace(/[^0-9]/gi, '')) : null
      pid = parseInt(pid.replace('#', ''))

      if (!name || !progress) return

      const itemProgress = {
        name,
        progress,
        utime: moment().format('X'),
        pid
      }

      listProgress.push(itemProgress)
    })

    listProgress.forEach(item => {
      this.ctx.model.Progress.create(item)
    })

    return listProgress
  }
}

module.exports = BuildService
