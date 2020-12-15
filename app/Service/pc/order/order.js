const Service = require('egg').Service;

class Order extends Service{
  async orderList(query){
    let where={};
    if(query.order){
      where.orderNum=query.order;
    }
    if(query.status){
      where.status=query.status;
    }
    let list = await this.ctx.model.Order.findAll({
      where,
      include:[
        {
          model:this.ctx.model.User,
          as:'user'
        }
      ]
    })
    return {
      status:200,
      data:list,
    }
  }
}

module.exports = Order
