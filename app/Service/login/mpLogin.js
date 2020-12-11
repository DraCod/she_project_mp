'use strict';

const Service = require('egg').Service;

class LoginSrvice extends Service {
  async Login(decoded) {
    const find = await this.ctx.model.User.findOrCreate({
      where: {
        openId: decoded.openId,
      },
      defaults: {
        userName: decoded.nickName,
        openId: decoded.openId,
      },
    });
    return {
      status:200,
      ...find[0].dataValues,
      ...decoded,
    };
  }
}

module.exports = LoginSrvice;
