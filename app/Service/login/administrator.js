'use strict';

const Service = require('egg').Service;

class AdministratorLoginService extends Service {
  /**
   *
   * @param account 账号
   * @param password 密码
   * @returns {Promise<void>}
   */
  async login({ username, password }) {
    let find = await this.ctx.model.Administrator.findOne({
      where: {
        username,
        password,
      },
    });
    if (find) {
      find = find.dataValues;
      return {
        status: 200,
        token: this.ctx.app.jwt.sign({
          id: find.id,
          name: find.name,
        }, this.app.config.jwt.secret, {
          expiresIn: '6000000s',
        }),
      };
    } else {
      return {
        status: 402,
        msg: '账号或者密码错误',
      };
    }
  }
}

module.exports = AdministratorLoginService;
