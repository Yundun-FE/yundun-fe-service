'use strict';

const { Subscription } = require('egg');

class Progress extends Subscription {
  static get schedule() {
    return {
      interval: '10s',
      type: 'all',
      disable: true,
    };
  }

  async subscribe() {
    this.ctx.service.build.getProgress();
    console.log(Date.now(), 'PROGRESS UPDATED');
  }
}

module.exports = Progress;
