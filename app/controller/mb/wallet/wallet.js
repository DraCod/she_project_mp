const Controller = require('egg').Controller

class Wallet extends Controller{
  async walletList(){
    const {id} = this.app.getUserId(this.ctx);
    const query = this.ctx.query;
    this.ctx.body = await this.ctx.service.mb.wallet.wallet.walletList(id,query)
  }
}

module.exports = Wallet