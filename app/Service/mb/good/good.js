const Service = require('egg').Service;
const Sequelize = require('sequelize');

class Good extends Service{
  async searchList(query){
    //ASC从小到大
    //DESC从大到小
    let list = await this.ctx.model.Goods.findAll({
      where:{
        goods:{
          [Sequelize.Op.like]:`%${query.search}`
        }
      },
      order:[
        [query.order||'id',query.way||'ASC']
      ],
      include:[
        {
          model:this.ctx.model.Img,
          as:'main'
        }
      ]
    })
    return {
      status:200,
      data:list
    }
  }
}

module.exports = Good
