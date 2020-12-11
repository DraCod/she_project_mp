'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
let time = null;

// ctx.request.body   post
class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    if (!body.code) {
      ctx.body = {
        msg: '缺少code',
        status: 402,
      };
      return;
    }
    if (!body.encryptedData) {
      ctx.body = {
        msg: '缺少encryptedData',
        status: 402,
      };
      return;
    }
    if (!body.iv) {
      ctx.body = {
        msg: '缺少iv',
        status: 402,
      };
      return;
    }
    await this.getUser({
      code: body.code,
      encryptedData: body.encryptedData,
      iv: body.iv,
    });
    // ctx.app.jwt.sign({
    //   ...ctx.request.body,
    // }, this.app.config.jwt.secret, {
    //   expiresIn: '60s',
    // });
  }


  // eslint-disable-next-line jsdoc/check-param-names
  /**
   *微信小程序登录信息
   * @param {string} code code
   * @param {string} encryptedData encryptedData
   * @param {string} iv iv
   * @return {
   *    decoded
   * } 用户信息
   */
  async getUser({ code, encryptedData, iv }) {
    const { session_key } = await this.getOpenId(code);
    encryptedData = Buffer.from(encryptedData, 'base64');
    iv = Buffer.from(iv, 'base64');
    let decoded;
    try {
      const decipher = crypto.createDecipheriv('aes-128-cbc', session_key, iv);
      decipher.setAutoPadding(true);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error('Illegal Buffer');
    }
    // console.log(await this.ctx.service.login.Login(decoded));
    // console.log(111111111);
    // this.ctx.body = {
    //   msg: '请重新再试',
    //   status: -1,
    // };
    console.log(decoded, 'decoded');

    const data = await this.ctx.service.mpLogin.Login(decoded);
    this.ctx.body = {
      status: 1,
      data,
      token: this.ctx.app.jwt.sign({ id: data.id, openId: data.openId, userName: data.userName }, this.app.config.jwt.secret, {
        expiresIn: '6000000s',
      }),
    };
  }

  /**
   * 获取微信token
   */
  async getAccessToken() {
    const config = this.ctx.app.config;
    if (config.token) {
      return config.token;
    }
    const data = {
      grant_type: 'client_credential',
      appid: config.AppID,
      secret: config.AppSecret,
    };
    const res = await this.ctx.curl('https://api.weixin.qq.com/cgi-bin/token', {
      method: 'GET',
      dataType: 'json',
      data,
    });
    let return_data = '';
    if (res.status === 200 && res.data.access_token) {
      config.token = res.data.access_token;
      config.expires_in = res.data.expires_in;
      time = setInterval(() => {
        if (config.expires_in <= 0) {
          clearInterval(time);
          config.expires_in = '';
          config.token = '';
        }
        config.expires_in--;
      });
      return_data = config.token;
    } else {
      return_data = '请求失败';
    }
    return return_data;
  }


  /**
   * 获取session_key
   * @param {string} js_code js_code
   */
  async getOpenId(js_code) {
    const config = this.ctx.app.config;
    const res = await this.ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
      method: 'GET',
      dataType: 'json',
      data: {
        grant_type: 'client_credential',
        appid: config.AppID,
        secret: config.AppSecret,
        js_code,
      },
    });
    if (res.status === 200) {
      return {
        session_key: Buffer.from(res.data.session_key, 'base64'),
      };
    }
    this.ctx.body = {
      msg: '请重新再试',
      status: -1,
    };
  }
}

module.exports = LoginController;
