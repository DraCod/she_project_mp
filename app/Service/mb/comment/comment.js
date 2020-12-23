const Service = require('egg').Service;

class Comment extends Service {
  async previewComment({order}){
    const find = await this.ctx.model.Order.findOne({
      where:{
        id:order
      }
    })
    if(!find){
      return {
        status:402,
        msg:'不存在订单id'
      }
    }
    const goodList = JSON.parse(find.dataValues.goodList);
    const good = await this.app.model.query(`
          SELECT goods.id,goods.goods,goods.price,imgs.path FROM goods LEFT JOIN imgs ON goods.main_id = imgs.id  where goods.id = ${goodList.map(row=>row.id).join(' or goods.id =')}
    `)
    return {
      status:200,
      order,
      data:good[0]
    }
  }

  async setComment(body){
    await this.ctx.model.Comment.bulkCreate(body.goodList)
    await this.ctx.model.Order.update({
      status:5
    },{
      where:{
        id:body.id
      }
    })
    return {
      status:200,
      msg:'评论成功'
    }
  }

  async commentList(query){
    const list = await this.ctx.model.Comment.findAll({
      where:{
        goodId:query.id
      },
      include:[
        {
          model:this.ctx.model.User,
          as:'user'
        }
      ]
    })
    return {
      status:200,
      data:list
    }
  }
}

module.exports = Comment