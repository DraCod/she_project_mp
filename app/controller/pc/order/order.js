const Controller = require("egg").Controller;

class Order extends Controller{
  async orderList(){
    const {ctx} = this;
    const {query} = ctx;
    
  }
}

module.exports = Order