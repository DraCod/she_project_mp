const Service = require('egg').Service

class Shopcar extends Service{
  async addCar(body){
    const {ctx} = this;
    const findGood = await ctx.model.Goods.findOne({
      where:{
        id:body.goodId
      }
    })
    if(!findGood){
      return {
        status:402,
        msg:"没有该商品"
      }
    }
    const findCar = await ctx.model.Shopcar.findOne({
      where:{
        goodId:body.goodId,
        userId:body.userId
      }
    })
    if(findCar){
      await ctx.model.Shopcar.update({
        num:parseInt(findCar.dataValues.num)+parseInt(body.num)
      },{
        where:{
          id:findCar.dataValues.id
        }
      })
    }else{
      await ctx.model.Shopcar.create({
        goodId:body.goodId,
        num:body.num,
        userId: body.userId
      })
    }
    return {
      status:200,
      msg:'添加购物车成功'
    }
  }

  async removeCar(body){
    const {ctx} = this;
    const findGood = await ctx.model.Goods.findOne({
      where:{
        id:body.goodId
      }
    })
    if(!findGood){
      return {
        status:402,
        msg:"没有该商品"
      }
    }
    const findCar = await ctx.model.Shopcar.findOne({
      where:{
        goodId:body.goodId,
        userId:body.userId
      }
    })
    if(findCar){
      const num=findCar.dataValues.num;
      if(body.num>num){
        return {
          status:402,
          msg:'购物车没有着么多数量'
        }
      }
      if(body.num==num){
        await ctx.model.Shopcar.destroy({
          where:{
            id:findCar.dataValues.id
          }
        })
      }
      if(body.num<num){
        await ctx.model.Shopcar.update({
          num:findCar.dataValues.num-body.num
        },{
          where:{
            id:findCar.dataValues.id
          }
        })
      }
    }else{
      return {
        status:402,
        msg:'该商品不在购物车了'
      }
    }
    return {
      status:200,
      msg:'删除成功'
    }
  }
}
module.exports = Shopcar;