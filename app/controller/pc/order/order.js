const Controller = require("egg").Controller;

class Order extends Controller{
  async orderList(){
    const {ctx} = this;
    const {query} = ctx;
    ctx.body = await ctx.service.pc.order.order.orderList(query);
  }
}

module.exports = Order