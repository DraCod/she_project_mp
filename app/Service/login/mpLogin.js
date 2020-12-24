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
        avatarUrl:decoded.avatarUrl,
        giveWallet:998
      },
    });
    return {
      status:200,
      ...find[0].dataValues,
      ...decoded,
    };
  }

  async userInfo(id){
    const find = await this.ctx.model.User.findOne({
      where: {
        id
      }
    });
    return {
      status:200,
      ...find.dataValues,
    };
  }

  async getWallet(id){
    return {
      status:200,
      data:await this.ctx.model.User.findOne({
        where:{
          id,
        },
        attributes:['giveWallet','rechargeWallet']
      })
    }
  }
}

module.exports = LoginSrvice;
