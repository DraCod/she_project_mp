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
    ctx.body = await ctx.service.mb.advert.advert.addAdvert(body);
  }


  async advertList(){
    const {ctx} = this;
    const {query} = ctx;
    ctx.body = await ctx.service.mb.advert.advert.advertList(query);
  }

  async removeAdvert(){
    const {ctx} = this;
    const {body} = ctx.request;
    if(!body.id){
      ctx.body = {
        status: 402,
        msg:'缺少广告id'
      }
      return
    }
    ctx.body = await this.ctx.service.mb.advert.advert.removeAdvert(body);
  }
}

module.exports = Advert