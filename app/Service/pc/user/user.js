const Service = require('egg').Service;

class User extends Service{
  async getUserInfo(id){
      return await this.ctx.model.Administrator.findOne({
        where:{
          id,
        }
      })
  }

  async userList(){
    return {
      status:200,
      data:await this.ctx.model.User.findAll()
    };
  }

  async giveWallet(body){
    const find = await this.ctx.model.User.findOne({
      where:{
        id:body.userId
      }
    })
    const giveWallet = find.dataValues.giveWallet+Number(body.giveWallet)
    await this.ctx.model.User.update({
      giveWallet
    },{
      where:{
        id:Number(body.userId)
      }
    })
    await this.ctx.model.Wallet.create({
      content:`充值金额¥${body.giveWallet}`,
      num:body.giveWallet,
      type:1,
      userId:body.userId
    })
    return {
      status:200,
      msg:'赠送成功'
    }
  }
}

module.exports = User;
