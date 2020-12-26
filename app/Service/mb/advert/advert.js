const Service = require('egg').Service;

class Advert extends Service{
  async addAdvert(body){
    await this.ctx.model.Advert.create({
      type:body.type,
      img:body.img
    })
    return {
      status:200,
      msg:'添加成功'
    }
  }

  async advertList(query){
    let where={};
    if(query.type){
      where.type = query.type
    }
    return {
      status:200,
      data:await this.ctx.model.Advert.findAll({
        where
      })
    }
  }
}

module.exports = Advert