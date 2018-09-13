'use strict'

const Service = require('egg').Service
const clientList = new Map()

class ClientService extends Service {
  async login(id) {
    clientList.set(id, Date.now())
  }

  async list() {
    return clientList
  }

  async addNotice(list) {
    list = list.filter(_ => _.status)

    list.forEach(item => {
      const { name, status } = item
      clientList.forEach((value, key) => {
        const itemCreate = {
          content: `${name},${status}`,
          clientid: key
        }
        this.ctx.model.Notice.create(itemCreate)
      })
    })
  }
}

module.exports = ClientService
