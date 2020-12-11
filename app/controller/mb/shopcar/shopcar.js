const Controller = require('egg').Controller;

class Shopcar extends Controller{
    carVerify(){
      const {ctx} = this;
      const body = ctx.request.body;
      const verify = this.app.verify([
        {
          label:'goodId',
          value:body.goodId
        },
        {
          label:'num',
          value:body.num
        }
      ])
      if(verify){
        ctx.body= {
          status:402,
          msg:verify
        }
        return
      }
      // const {id} = this.app.getUserId(ctx);
      const id = 1
      body.userId = id
    }

  /**
   * @param goodId 商品id
   * @param num 数量
   * @returns {Promise<void>}
   */
  async addCar(){
      this.carVerify();
      this.ctx.body = await this.ctx.service.mb.shopcar.shopcar.addCar(this.ctx.request.body);
    }

  /**
   * @param goodId 商品id
   * @param num 数量
   * @returns {Promise<void>}
   */
    async removeCar(){
      this.carVerify();
      this.ctx.body = await this.ctx.service.mb.shopcar.shopcar.removeCar(this.ctx.request.body);
    }
}

module.exports = Shopcar