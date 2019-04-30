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
    // const uid = this.createUid(this.formatUsername(username));
    const userData = await this.findByUsername(username);
    const _password = crypto.createHmac('sha256', this.app.config.keys).update(password).digest('hex');
    if (_password !== userData.password) throw new Error('PasswordError');
    return this.formatResult(userData);
  }

  async register(data) {
    let userData;
    if (!data.username && !data.email && !data.phoneNumber) throw new Error('NotUsername');

    if (data.username) {
      try {
        userData = await this.findByUsername(data.username);
      } catch (e) {
        //
      }
      if (userData) throw new Error('UsernameExist');
    }

    if (data.email) {
      try {
        userData = await this.findByUsername(data.email);
      } catch (e) {
        //
      }
      if (userData) throw new Error('EmailExist');
    }

    if (data.phoneNumber) {
      try {
        userData = await this.findByUsername(data.phoneNumber);
      } catch (e) {
        //
      }
      if (userData) throw new Error('phoneNumberExist');
    }

    data.uid = this.createUid(data);
    return await this.Model.create(data);
  }

  createUid(data) {
    const { username = '-', email = '-', phoneNumber = '-' } = data;
    const line = `${username}.${email}.${phoneNumber}`;
    return crypto.createHash('md5').update(line).digest('hex');
  }

  formatUsername(username) {
    if (Rule.EmailReg.test(username)) {
      return { email: username };
    } else if (Rule.mobile.test(username)) {
      return { phoneNumber: username };
    }
    return { username };
  }

  formatResult(userData) {
    const uData = {
      uid: userData.uid,
      userId: userData.userId,
    };
    const token = this.app.jwt.sign(uData, this.app.config.jwt.secret);
    const result = {
      userId: userData.userId,
      avatar: userData.avatar,
      username: userData.username,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      tz: userData.tz,
      language: userData.language,
      lastLoginIp: userData.lastLoginIp,
      lastLoginTime: userData.lastLoginTime,
      token,
      roles: {
        id: 'admin',
        permissions: [
          {
            permissionId: 'dashboard',
          },
        ],
      },
    };
    return result;
  }

  async findById(userId) {
    const data = await this.Model.findOne({ where: { userId } });
    if (!data) throw new Error('NotFoundUser');
    return data;
  }

  async updateById(update, userId) {
    const result = await this.Model.update(update, {
      where: { userId },
    });
    return result;
  }

  async findByUid(uid) {
    const data = await this.Model.findOne({ where: { uid } });
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
      where.username = username;
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
