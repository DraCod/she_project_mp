const Service = require('egg').Service


class Order extends Service{
  async previewOrder(body){
    let findAddress=null;
    let where={};
    if(body.addressId){
      where.id=body.addressId
    }
    if(body.addressId){
      findAddress = await this.ctx.model.Address.findOne({
        where
      })
    }else{
      findAddress = await this.ctx.model.Address.findOne({
        where:{
          default:1,
          userId:body.userId
        }
      })
      if(!findAddress){
        return {
          status:402,
          msg:'先添加地址'
        }
      }
    }
    const goodList = await this.app.model.query(`
      SELECT goods.id,goods.goods,goods.price,imgs.path FROM goods LEFT JOIN imgs ON goods.main_id = imgs.id  where goods.id = ${body.goodList.map(row=>row.id).join(' or goods.id = ')}
    `)
    console.log(1);

    let price = 0;
    goodList[0].forEach(row=>{
      let find = body.goodList.find(ro=>ro.id==row.id)
      row.num = find.num;
      price+=(row.num*row.price)
    })
    return {
      status:200,
      goodList:goodList[0],
      info:{
        price,
      },
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
        // userId:body.userId,
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
        // userId:body.userId,
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

  async orderStatus(query){
    let obj = await Promise.all([
      this.app.model.query(`SELECT COUNT(*) as count FROM orders where status = 1 and user_id = ${query.userId}`),
      this.app.model.query(`SELECT COUNT(*) as count FROM orders where status = 2 and user_id = ${query.userId}`),
      this.app.model.query(`SELECT COUNT(*) as count FROM orders where status = 3 and user_id = ${query.userId}`),
      this.app.model.query(`SELECT COUNT(*) as count FROM orders where status = 4 and user_id = ${query.userId}`),
    ]).then(res=>{
     return {
       await_pay:res[0][0][0].count,
       await_transport:res[1][0][0].count,
       await_take:res[2][0][0].count,
       await_evaluation:res[3][0][0].count
     }
    })
    return {
      status:200,
      data:obj
    }
  }


  async orderList(query){
    let where={
      userId:query.userId
    }
    if(query.status){
      where.status=query.status
    }
    let list = await this.ctx.model.Order.findAll({
      where,
      order:[
        ['created_at','desc']
      ]
    })
    for (let item of list){
      item.goodList = JSON.parse(item.goodList);
      let arr=await this.app.model.query(`
        SELECT goods.id,goods.goods,goods.price,imgs.path FROM goods LEFT JOIN imgs ON goods.main_id = imgs.id WHERE goods.id = ${item.goodList.map(row=>row.id).join(' or ')}
      `)
      arr = arr[0];
      let price=0;
      arr.forEach(el=>{
        let find = item.goodList.find(ro=>ro.id==el.id);
        el.num = find.num;
        price+=(Number(el.num)*Number(el.price));
      })
      item.dataValues.price = price;
      item.goodList = arr;
    }
    return{
      status:200,
      data:list
    }
  }

  async orderPay({ userId,id,type }){
    let user = await this.ctx.model.User.findOne({
      where:{
        id:userId
      }
    })
    user=user.dataValues
    const order = await this.ctx.model.Order.findOne({
      where:{
        id:id
      }
    })
    const goodList = JSON.parse(order.dataValues.goodList);
    const good = await this.app.model.query(`
        SELECT id, price FROM goods WHERE id = ${goodList.map(row=>row.id).join(' or ')}
    `)
    let price=0;
    good[0].forEach(el=>{
      let find = goodList.find(ro=>ro.id==el.id);
      el.num = find.num;
      price +=(Number(el.price)*find.num);
    })
    if(user.giveWallet+user.rechargeWallet<price){
      return{
        status:402,
        msg:'余额不足'
      }
    }
    if(user[type]<price){
      let cha = price - user[type];
      let other = type==='giveWallet'?'rechargeWallet':'giveWallet'
      await this.ctx.model.User.update({
        [type]:0,
        [other]:user[other]-cha
      },{
        where:{
          id:userId
        }
      })
      await this.ctx.model.Order.update({
        status:2
      },{
        where:{
          id:id
        }
      })
      const arr=[
        {
          content:`支付订单${order.dataValues.orderNum}使用${type==='giveWallet'?'赠送金额':'充值金额'}¥${price-cha}`,
          userId,
          type:2,
          num:price-cha
        },
        {
          content:`支付订单${order.dataValues.orderNum}使用${type!=='giveWallet'?'赠送金额':'充值金额'}¥${cha}`,
          userId,
          type:2,
          num:cha
        }
      ]
      await this.ctx.model.Wallet.bulkCreate(arr);
      return {
        status:200,
        msg:`${other==='rechargeWallet'?'充值':'赠送'}余额不足，已用其他余额填充`
      }
    }else{
      console.log(type,user[type],user);
      await this.ctx.model.User.update({
        [type]:user[type]-price
      },{
        where:{
          id:userId
        }
      })
      await this.ctx.model.Order.update({
        status:2
      },{
        where:{
          id:id
        }
      })
      await this.ctx.model.Wallet.create({
        content:`支付订单${order.dataValues.orderNum}使用${type=='giveWallet'?'赠送金额':'充值金额'}¥${price}`,
        userId,
        type:2,
        num:price
      });
      return {
        status:200,
        msg:'支付成功'
      }
    }
  }
}

module.exports = Order