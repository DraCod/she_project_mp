const Service = require('egg').Service


class Order extends Service{
  async previewOrder(body){
    const findAddress = await this.ctx.model.Address.findOne({
      where:{
        default:1,
        userId:body.userId
      }
    })
    const goodList = await this.app.model.query(`
      SELECT * FROM goods where id = ${body.goodList.map(row=>row.id).join(' or id =')}
    `)
    let price = 0;
    goodList[0].forEach(row=>{
      let find = body.goodList.find(ro=>ro.id==row.id)
      row.num = find.num;
      price+=(row.num*row.price)
    })
    return {
      status:200,
      goodList:goodList[0],
      price,
      address:findAddress||null
    }
  }

  async createOrder(body){
      const goodList = body.goodList;
      for (let item of goodList){
        let good=await this.ctx.model.Goods.findOne({
          where:{
            id:item.id
          }
        })
        good=good.dataValues;
        if(Number(good.buy)+Number(item.num)>good.total){
          return {
            status:402,
            msg:good.goods+'数量不足'
          }
        }else{
          await this.ctx.model.Goods.update({
            buy:Number(good.buy)+Number(item.num)
          },{
            where:{
              id:good.id
            }
          })
        }
      }
      body.goodList = JSON.stringify(body.goodList);
      const create=await this.ctx.model.Order.create({
        ...body,
        status:1,
        orderNum:new Date().getTime()%10000000000+parseInt(Math.random()*10)
      })
      return {
        status:200,
        data:create
      }
  }

  async editOrder(body){
    const order = await this.ctx.model.Order.findOne({
      where:{
        userId:body.userId,
        id:body.id,
      }
    })
    if(!order){
      return{
        status:402,
        msg:'不存在该订单'
      }
    }
    if(body.status<=order.dataValues.status){
      return {
        status:402,
        msg:'操作失败'
      }
    }
    await this.ctx.model.Order.update({
      status:body.status
    },{
      where:{
        userId:body.userId,
        id:body.id,
      }
    })
    return {
      status:200,
      msg:'操作成功'
    }
  }

  async orderDetail(query){
    let find =await this.ctx.model.Order.findOne({
      where:{
        id:query.id,
        userId:query.userId
      },
      include:[
        {
          model:this.app.model.Address,
          as:'address',
        },
      ]
    })
    if(!find){
      return{
        status:402,
        msg:'不存在该订单'
      }
    }
    find = find.dataValues;
    find.goodList = JSON.parse(find.goodList);
    let goodList=[];
    let account=0
    for(let item of find.goodList){
      let good = await this.ctx.model.Goods.findOne({
        where:{
          id:item.id
        },
        include:[
          {
            model:this.app.model.Img,
            as:'main',
          },
        ]
      })
      goodList.push({...item,...good.dataValues})
      account+=(item.num*good.dataValues.price);
    }
    find.goodList=goodList;
    return {
      status:200,
      data: { ...find,account }
    }
  }
}

module.exports = Order