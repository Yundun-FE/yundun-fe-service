'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
const Rule = require('../../utils/rule');

class UsersService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Users;
  }

  async login(data) {
    const { password, username } = data;
    const userData = await this.findByUsername(username);
    const _password = crypto.createHmac('sha256', this.app.config.keys).update(password).digest('hex');
    if (_password !== userData.password) throw new Error('PasswordError');
    return userData;
  }

  async register(data) {
    let userData;
    try {
      userData = await this.findByUsername(data);
    } catch (e) {
      //
    }
    if (userData) throw new Error('UserAlreadyExist');
    return await this.Model.create(data);
  }

  async findById(userId) {
    const data = await this.Model.findOne({ where: userId });
    if (!data) throw new Error('NotFoundUser');
    return data;
  }

  async findByUsername(username) {
    const where = {};
    if (Rule.EmailReg.test(username)) {
      where.email = username;
    } else if (Rule.mobile.test(username)) {
      where.phoneNumber = username;
    } else {
      throw new Error('UsernameError');
    }

    const data = await this.Model.findOne({ where });
    if (!data) throw new Error('NotFoundUser');
    return data;
  }

  async updateProfile(data) {
    const { userId } = data;
    await this.findById({ userId });
    try {
      await this.model.UsersProfiles.update(data, {
        where: { userId },
      });
    } catch (e) {
      throw new Error('UpdateUserError');
    }
  }

  async resetPassword(data) {
    const { oldPassword, newPassword, userId } = data;
    const userData = await this.findById(userId);
    if (oldPassword !== userData) throw new Error('OldPasswordError');
    try {
      await this.Model.update({ password: newPassword }, { where: userId });
    } catch (e) {
      throw new Error('UpdatePasswordError');
    }
  }
}

module.exports = UsersService;
