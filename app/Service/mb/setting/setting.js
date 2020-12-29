const Service  = require('egg').Service;


class Setting extends Service{
  async editName(body){
    await this.ctx.model.User.update({
      otherName:body.name
    },{
      where:{
        id:body.id
      }
    })
    return {
      status:200,
      msg:'修改成功'
    }
  }

  async addFeedback(body){
    await this.ctx.model.Feedback.create({
      content:body.content,
      userId:body.id
    })
    return{
      status:200,
      msg:'反馈成功'
    }
  }

  async feedbackList(){
    return {
      status:200,
      data:await this.ctx.model.Feedback.findAll({
        include:[
          {
            model:this.ctx.model.User,
            as:'user'
          }
        ]
      })
    }
  }
}

module.exports = Setting