const Controller = require('egg').Controller

class Order extends Controller{
  async previewOrder(){
    const {ctx} = this;
    const {body} = ctx.request;
    try{
      body.goodList = JSON.parse(body.goodList)
    }catch (e){
      return{
        status:402,
        msg:e
      }
    }
    console.log(body);
    const verify = this.app.verify([
      {
        label:'goodList',
        value:body.goodList,
        rule:(arr)=>{
          for (const item of arr) {
            if(item.id&&item.num){
            }else{
              return false
            }
          }
          return true
        },
        msg:'goodList数组参数错误'
      }
    ])
    if(verify){
      ctx.body={
        status:402,
        msg:verify
      }
      return
    }
    // const {id} = this.app.getUserId(ctx);
    const id = 1;
    body.userId = id;
    console.log(body)
    ctx.body = await ctx.service.mb.order.order.previewOrder(body);
  }


  async createOrder(){
    const {ctx} = this;
    const {body} = ctx.request;
    try{
      body.goodList = JSON.parse(body.goodList)
    }catch (e){
      return{
        status:402,
        msg:e
      }
    }
    const verify = this.app.verify([
      {
        label:'goodList',
        value:body.goodList,
        rule:(arr)=>{
          for (const item of arr) {
            if(item.id&&item.num){
            }else{
              console.log(item.id,item.num)
              return false
            }
          }
          return true
        },
        msg:'goodList数组参数错误'
      },
      {
        label:'addressId',
        value:body.addressId,
      },
      // {
      //   label:'type',//1  购物车下单  0 直接下单
      //   value:body.type,
      //   rule:(value)=>{
      //     if(value!=0&&value!=1){
      //       return false
      //     }
      //     return true
      //   },
      //   msg:'type只能为1或0'
      // }
    ])
    if(verify){
      ctx.body={
        status:402,
        msg:verify
      }
      return
    }
    // const {id} = this.app.getUserId(ctx);
    const id = 1;
    body.userId = id;
    ctx.body = await ctx.service.mb.order.order.createOrder(body);
  }

  async editOrder(){
    const {ctx} = this;
    const {body} = ctx.request;
    const verify = this.app.verify([
      {
        label:'id',
        value:body.id
      },
      {
        label:'status',
        value:body.status
      }
    ]);
    if(verify){
      ctx.body={
        status:402,
        msg:verify
      }
      return
    }
    // const {id} = this.app.getUserId(ctx);
    const id = 1;
    body.userId = id;
    ctx.body = await ctx.service.mb.order.order.editOrder(body);
  }

  async orderDetail(){
    const query=this.ctx.query;
    // const {id} = this.app.getUserId(ctx);
    const id = 1;
    query.userId = id;
    this.ctx.body =  await this.ctx.service.mb.order.order.orderDetail(query);
  }
}
module.exports = Order