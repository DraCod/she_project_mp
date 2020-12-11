const Service = require('egg').Service;

class User extends Service{
  async getUserInfo(id){
      return await this.ctx.model.Administrator.findOne({
        where:{
          id,
        }
      })
  }

  async userList(){
    return {
      status:200,
      data:await this.ctx.model.User.findAll()
    };
  }
}

module.exports = User;
