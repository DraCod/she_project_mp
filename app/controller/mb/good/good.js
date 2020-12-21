const Controller = require('egg').Controller;

class Good extends Controller{
  async searchList(){
    const {ctx} = this;
    const { query } = ctx;
    //buy ,price , new
    // sort :'buy',
    //
    ctx.body = await ctx.service.mb.good.good.searchList(query);
  }
}

module.exports = Good
