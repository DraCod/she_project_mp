const Service = require('egg').Service;

class Collection extends Service{
    async addCollection(body){
      await this.ctx.model.Collection.create({
        userId:body.userid,
        goodId:Number(body.id)
      })
      return {
        status:200,
        msg:'收藏成功'
      }
    }

    async collectionList(id){
      return {
        status:200,
        data:await this.ctx.model.Collection.findAll({
          where:{
            userId:id
          },
          include:[
            {
              model:this.ctx.model.Goods,
              as:'good',
              include:[
                {
                  model:this.ctx.model.Img,
                  as:'main'
                }
              ]
            }
          ]
        })
      }
    }

    async removeCollection(body){
      let find = await this.ctx.model.Collection.findOne({
        where:{
          goodId:body.id,
          userId:body.userid
        }
      })
      if(!find){
        return {
          status:402,
          msg:"不存在该数据"
        }
      }
      await this.ctx.model.Collection.destroy({
        where:{
          id:find.dataValues.id
        }
      })
      return {
        status:200,
        msg:'取消收藏成功'
      }
    }
}

module.exports = Collection