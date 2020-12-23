const Controller = require('egg').Controller;

class Comment extends Controller{
    async previewComment(){
      const {ctx} = this;
      const {query} = ctx;
      if(!query.order){
        ctx.body = {
          status:402,
          msg:'没有orderid'
        }
        return
      }
      ctx.body = await ctx.service.mb.comment.comment.previewComment(query);
    }


    async setComment(){
      const {ctx} = this;
      const {body} = ctx.request;
      const  verify = this.app.verify([
        {
          label:'id',
          value:body.id
        },
        {
          label:'goodList',
          value:body.goodList,
        }
      ])
      if(verify){
        ctx.body={
          status: 402,
          msg:verify
        }
        return
      }
      const {id} = this.app.getUserId(ctx);
      // body.userId = id;
      body.goodList.forEach(el=>{
        el.userId = id;
      })
      ctx.body = await ctx.service.mb.comment.comment.setComment(body);
    }


    async commentList() {
      const { ctx } = this;
      const { query } = ctx;
      if(!query.id){
        ctx.body = {
          status:402,
          msg:'id不能为空'
        }
        return
      }
      ctx.body = await ctx.service.mb.comment.comment.commentList(query);
    }

}

module.exports = Comment;