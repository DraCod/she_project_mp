const Controller = require('egg').Controller;


class Setting extends Controller{
  async editName(){
    const {ctx} = this;
    const  {body} = ctx.request;
    const {id} = this.app.getUserId(ctx);
    body.id = id;
    ctx.body = await ctx.service.mb.setting.setting.editName(body)
  }

  async addFeedback(){
    const {ctx} = this;
    const {body} = ctx.request;
    const {id} = this.app.getUserId(ctx);
    body.id = id;
    ctx.body = await ctx.service.mb.setting.setting.addFeedback(body)
  }

  async feedbackList(){
    this.ctx.body = await this.ctx.service.mb.setting.setting.feedbackList();
  }
}

module.exports = Setting