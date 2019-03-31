'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class UsersService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.Applications;
  }

  async login(data) {
    const { password } = data;
    const userData = await this.findByUsername(data);
    if (password !== userData.password) throw new Error('PasswordError');
  }

  async register(data) {
    const { email } = data;
    const where = { email };
    const userData = await this.Model.findOne(where);
    if (userData) throw new Error('UserAlreadyExist');
    try {
      await this.Model.create(data);
    } catch (e) {
      throw new Error('UserCreateError');
    }
  }

  async findById(userId) {
    const data = await this.Model.findOne({ userId });
    if (!data) throw new Error('NotFoundUser');
    return data;
  }

  async findByUsername({ email, phoneNumber }) {
    const where = {};
    if (email) {
      where.email = email;
    } else if (phoneNumber) {
      where.phoneNumber = phoneNumber;
    }
    const data = await this.Model.findOne(where);
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
