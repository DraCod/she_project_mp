const Service = require('egg').Service;

class Text extends Service{
  async editText(body){
    await this.ctx.model.Text.update({
      content:body.content
    },{
      where:{
        id:body.id
      }
    })
    return{
      status:200,
      msg:'修改成功'
    }
  }

  async getText(query){
    return{
      status:200,
      data:await this.ctx.model.Text.findOne({
        where:{
          id:query.id
        }
      })
    }
  }
}

module.exports = Text