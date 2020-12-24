const Service = require('egg').Service;

class Wallet extends Service{
  async walletList(id,query){
    let where={
      userId: id
    }
    if(query.type){
      where.type = query.type
    }
    let list = await this.ctx.model.Wallet.findAll({
      where
    })
    let user = await this.ctx.model.User.findOne({
      where:{
        id
      }
    })
    return {
      status:200,
      data:list,
      user,
    }
  }
}

module.exports = Wallet;