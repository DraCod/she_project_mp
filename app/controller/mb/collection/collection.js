const Controller = require('egg').Controller

class Collection extends Controller{
    async addCollection(){
      const {ctx} = this;
      const {id} = this.app.getUserId(ctx);
      const {body} = ctx.request;
      let verify = this.app.verify([
        {
          label:'id',
          value:body.id
        }
      ])
      if(verify){
        ctx.body = {
          status: 402,
          msg:verify
        }
        return
      }
      body.userid = id;
      ctx.body = await ctx.service.mb.collection.collection.addCollection(body);
    }


    async collectionList(){
      const {ctx} = this;
      const {id} = this.app.getUserId(ctx);
      ctx.body = await  ctx.service.mb.collection.collection.collectionList(id)
    }

    async removeCollection(){
      const {ctx} = this;
      const {id} = this.app.getUserId(ctx);
      const {body} = ctx.request;
      if(!body.id){
        ctx.body = {
          status: 402,
          msg:'商品id为必须'
        }
        return
      }
      body.userid = id;
      ctx.body = await ctx.service.mb.collection.collection.removeCollection(body);
    }
}

module.exports = Collection