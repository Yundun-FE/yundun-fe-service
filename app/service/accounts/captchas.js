const moment = require('moment');

function randomn(n) {
  if (n > 21) return null;
  const re = new RegExp('(\\d{' + n + '})(\\.|$)');
  const num = (Array(n - 1).join(0) + Math.pow(10, n) * Math.random()).match(
    re
  )[1];
  return num;
}

const captcheValidity = 300;

module.exports = app => {
  class Service extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.Model = ctx.model.AccountsCaptchas;
    }

    createByEmail(email) {}

    async getByUsername(username) {
      const oData = await this.findByUsername(username);
      if (oData) return oData.code;

      const code = randomn(6);
      try {
        await this.Model.create({ code, username });
      } catch (e) {
        throw new Error('CreateCaptcheError');
      }
      return code;
    }

    async findByUsername(username) {
      const validityTime = moment().subtract(captcheValidity + 60, 'seconds').format('YYYY-MM-DD HH:mm:ss');
      const data = await this.Model.findOne({
        where: { username, used: false, created_at: { $gt: validityTime } },
        order: [[ 'id', 'DESC' ]],
      });
      return data;
    }

    async checkByUsername({ username, code }) {
      const data = await this.findByUsername(username);
      if (data && data.code === code) {
        await this.usedById(data.id);
        return true;
      }
      throw new Error('CaptchaError');
    }

    async usedById(id) {
      await this.Model.update({ used: true }, { where: { id } });
    }
  }
  return Service;
};
