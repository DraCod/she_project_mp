const Service = require('egg').Service;
const fs = require('fs')
const Path = require('path');

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
        where,
        include:[
          {
            model:this.ctx.model.Img,
            as:'path'
          }
        ]
      })
    }
  }

  async removeAdvert(body){
    const find  = await this.ctx.model.Advert.findOne({
      where:{
        id:body.id
      }
    })
    if(!find){
      return {
        status:402,
        msg:'不存在该广告'
      }
    }
    await this.ctx.model.Advert.destroy({
      where:{
        id:find.dataValues.id
      }
    })
    const findImg = await this.ctx.model.Img.findOne({
      where:{
        id:find.dataValues.img
      }
    })
    let path = findImg.dataValues.path;
    fs.unlink(Path.resolve(__filename+"../../../../../"+path), (err) => {
    });
    await this.ctx.model.Img.destroy({
      where:{
        id:find.dataValues.img
      }
    })

    return {
      status:200,
      msg:'删除成功'
    }
  }
}

module.exports = Advert