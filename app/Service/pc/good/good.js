'use strict';

const Service = require('egg').Service;


class Good extends Service {
  async addClassify({classify}){
    const find = await this.ctx.model.Classify.findOne({
      where:{
        classify
      }
    })
    if(find){
      return  {
        status:402,
        msg:classify+'类别已存在，请前往修改'
      }
    }
    await this.ctx.model.Classify.create({
      classify
    })
    return  {
      status:200,
      msg:'新增成功'
    }
  }

  async classList(classify){
    let where={}
    if(classify){
      where={
        classify
      }
    }
    const data=await this.ctx.model.Classify.findAll({
      where
    });
    return  {
      status:200,
      data
    }
  }

  async editClassify({id,classify}){
    const find = await this.ctx.model.Classify.findOne({
      where:{
        id
      }
    })
    if(!find){
      return {
        status: 402,
        msg: '没有该分类'
      }
    }
    await this.ctx.model.Classify.update({
      classify
    },{
      where:{
        id
      }
    })
    return {
      status:200,
      msg:"修改成功"
    }
  }

  async upload(path){
    return  await this.ctx.model.Img.create({
      path
    })
  }

  async verifyBody(body){
    const{ctx} = this;
    const find_class = await ctx.model.Classify.findOne({
      where:{
        id:body.class_id
      }
    })
    if(!find_class){
      return {
        status:402,
        msg:'没有此分类id'
      }
    }
    const find_main = await ctx.model.Img.findOne({
      where:{
        id:body.main_id
      }
    })
    if(!find_main){
      return {
        status:402,
        msg:'找不到主图id'
      }
    }
    const path_main = await this.app.model.query(`
      SELECT * FROM imgs where id = ${body.path_id.split(',').join(' or id =')}
    `);
    if(path_main[0].length!==body.path_id.split(',').length){
      return {
        status:402,
        msg:'附图存在不在数据库的图片id'
      }
    }
    const detail_main = await this.findImg(body.detail_id);
    if(detail_main[0].length!==body.detail_id.split(',').length){
      return {
        status:402,
        msg:'详情图存在不在数据库的图片id'
      }
    }
  }

  async addGood(body){
    const {ctx} = this;
    const verify = await this.verifyBody(body);
    if(verify){
      return verify
    }
    const create = await ctx.model.Goods.create({
      goods:body.goods,
      price:body.price,
      class_id:body.class_id,
      main_id:body.main_id,
      path_id:body.path_id,
      detail_id:body.detail_id,
      total:body.total||9999,
      buy:body.buy||0,
    })
    return {
      status:200,
      msg:"添加成功",
      data:create,
    }
  }

  async editGood(body){
    const goods = await this.app.model.Goods.findOne({
      where:{
        id:body.id
      }
    })
    if(!goods){
      return {
        status:402,
        msg:'不存在该商品id'
      }
    }
    const verify = await this.verifyBody(body);
    if(verify) {
      return verify
    }
    await this.app.model.Goods.update({
      goods:body.goods,
      price:body.price,
      class_id:body.class_id,
      main_id:body.main_id,
      path_id:body.path_id,
      detail_id:body.detail_id,
      total:body.total,
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


  async goodList(){
    const find = await this.app.model.Goods.findAll({
      include:[
        {
          model:this.app.model.Classify,
          as:'class',
          attributes:['id','classify']
        },
        {
          model:this.app.model.Img,
          as:'main',
          attributes:['id','path']
        }
      ]
    });
    return {
      status:200,
      data:find
    }
  }

  async findImg(img){
   return await this.app.model.query(`
      SELECT * FROM imgs where id = ${img.split(',').join(' or id =')}
    `)
  }

  async getImg({img}){
    let find = await this.findImg(img)
    find=find[0];
    return {
      status:200,
      data:find
    }
  }

}

module.exports = Good
