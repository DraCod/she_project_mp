'use strict';
const Controller = require('egg').Controller;

class AdministratorLoginController extends Controller {
  /**
   * 后台登录接口
   * @param account 账号
   * @param password 密码
   * @return {Promise<void>}
   */
  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    const verify = this.app.verify([
      {
        label: 'username',
        value: body.username,
      },
      {
        label: 'password',
        value: body.password,
      },
    ]);
    if (verify) {
      ctx.body = {
        status: 402,
        msg: verify,
      };
      return;
    }
    ctx.body = await this.ctx.service.login.administrator.login(body);
  }
}

module.exports = AdministratorLoginController;
