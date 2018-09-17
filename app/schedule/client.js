const { Subscription } = require('egg')

class Clients extends Subscription {
  static get schedule() {
    return {
      interval: '600s',
      type: 'all'
    }
  }

  async subscribe() {
    // 清理离线用户
    this.ctx.service.client.clear()
    console.log(Date.now(), 'CLIENT CLEAR')
  }
}

module.exports = Clients
