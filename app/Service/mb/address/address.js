const Service = require('egg').Service;

class Address extends Service{
  async updateDefault(body){
    const default_address = await this.ctx.model.Address.findOne({
      where:{
        default:1,
        userId:body.userId
      }
    })
    if(default_address){
      await this.ctx.model.Address.update({
        default:0
      },{
        where:{
          id:default_address.dataValues.id
        }
      })
    }
  }

  async addAddress(body){
    if(body.default==1){
     await this.updateDefault(body)
    }
    const find = await this.ctx.model.Address.findOne({
      where:{
        userId:body.userId
      }
    })
    if(!find){
      body.default = 1;
    }
    await this.ctx.model.Address.create({
      ...body
    })
    return {
      status:200,
      msg:'新增成功'
    }
  }

  async editAddress(body){
    const id = body.id;
    delete body.id;
    const address = await this.ctx.model.Address.findOne({
      where:{
        id
      }
    })
    if(!address){
      return {
        status:402,
        msg:'不存在该地址'
      }
    }
    const find = await this.ctx.model.Address.findAll({
      where:{
        userId:body.userId
      }
    })
    if(find.length===1){
      body.default=1;
    }else{
      if(body.default==1){
        await this.updateDefault(body);
      }
    }
    await this.ctx.model.Address.update({
      ...body
    },{
      where:{
        id
      }
    })
    return {
      status:200,
      msg:'修改成功'
    }
  }

  async addressList({ userId }){
    return {
      status:200,
      data:await this.ctx.model.Address.findAll({
        where:{
          userId
        }
      })
    }
  }

  async addressDetail({userId,id}){
    return {
      status:200,
      data:await this.ctx.model.Address.findOne({
        where:{
          id,
          userId
        }
      })
    }
  }

  async removeAddress({ id , userId }){
    let destroy = await this.ctx.model.Address.destroy({
      where:{
        id,
        userId
      }
    })
    let find = await this.ctx.model.Address.findOne({
      where:{
        default:1
      }
    })
    if(!find){
      let one=await this.ctx.model.Address.findOne({
        where:{
          userId
        }
      })
      if(one){
        await this.ctx.model.Address.update({
          default:1
        },{
          where:{
            id:one.dataValues.id
          }
        })
      }
    }
    if(destroy){
      return {
        status:200,
        msg:'删除成功'
      }
    }else{
      return {
        status:402,
        msg:'操作失败'
      }
    }
  }
}

module.exports = Address