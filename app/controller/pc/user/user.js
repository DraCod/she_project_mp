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
}

module.exports = User;
