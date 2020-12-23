const Controller = require('egg').Controller;

class User extends Controller {
  async getUserInfo(){
    const {ctx} = this;
    const {id} = this.app.getUserId(ctx);
    ctx.body = await ctx.service.pc.user.user.getUserInfo(id);
  }

  async userList(){
    const {ctx} = this;
    ctx.body = await ctx.service.pc.user.user.userList();
  }

  async giveWallet(){
    const {ctx} = this;
    const {body} = ctx.request;
    const verify = this.app.verify([
      {
        label:'userId',
        value:body.userId
      },
      {
        label:'giveWallet',
        value:body.giveWallet
      }
    ])
    if(verify){
      ctx.body={
        status:402,
        msg:verify
      }
      return
    }
    ctx.body = await ctx.service.pc.user.user.giveWallet(body);
  }
}

module.exports = User;
