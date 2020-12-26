const Controller = require('egg').Controller;


class Advert extends Controller{
  async addAdvert(){
    const {ctx} = this;
    const {body} = ctx.request;
    const verify = this.app.verify([
      {
        label:'img',
        value:body.img
      },
      {
        label:'type',
        value: body.type
      }
    ])
    if(verify){
      ctx.body = {
        status:402,
        msg:verify
      }
      return
    }
    ctx.body = await ctx.service.advert.advert.addAdvert(body);
  }


  async advertList(){
    const {ctx} = this;
    const {query} = ctx;
    ctx.body = await ctx.service.mb.advert.advert.advertList(query);
  }
}

module.exports = Advert