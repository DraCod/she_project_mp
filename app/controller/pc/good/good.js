'use strict';


const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class Good extends Controller{
    /**
     * 添加分类
     * @param classify 分类名字
     */
    async addClassify(){
      const {ctx} = this;
      const body = ctx.request.body;
      const verify = this.app.verify([
          {
              label:'classify',
              value:body.classify
          }
      ])
      if(verify){
        ctx.body = {
          status:402,
          msg:verify
        };
        return;
      }
      ctx.body = await ctx.service.pc.good.good.addClassify(body);
    }

  /**
   * 查询分类
   * @param classify 分类名称（可选）
   */
  async classList(){
      const {ctx} =this;
      ctx.body = await ctx.service.pc.good.good.classList(ctx.query.classify);
  }

  async editClassify(){
    const {ctx} = this;
    const body = ctx.request.body;
    const verify = this.app.verify([
      {
        label:'id',
        value:body.id
      },
      {
        label:'classify',
        value:body.classify
      }
    ])
    if(verify){
      ctx.body = {
        status: 402,
        msg:verify
      }
      return
    }
    ctx.body = await ctx.service.pc.good.good.editClassify(body)
  }

  /**
   * 上传图片
   */
  async upload(){
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    //新建一个文件名
    const filename = md5(stream.filename)+new Date().getTime()+ path
      .extname(stream.filename)
      .toLocaleLowerCase();
    //文件路径
    const target = path.join(this.config.baseDir, 'app/public', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }
    //文件响应
    ctx.body = await ctx.service.pc.good.good.upload('public/' + filename)
    // ctx.body = {
    //   url: '/public/' + filename
    // };
  }

  /**
   * @param goods 商品名称
   * @param class_id 分类id
   * @param main_id 主图id
   * @param path_id 附图id
   * @param detail_id 详情图id
   * @param total 总数
   * @returns
   */
  async addGood(){
    const {ctx} = this;
    const body = ctx.request.body;
    const verify = this.app.verify([
      {
        label:'goods',
        value:body.goods
      },
      {
        label: 'class_id',
        value:body.class_id
      },
      {
        label:'main_id',
        value:body.main_id
      },
      {
        label:'detail_id',
        value:body.detail_id,
      }
    ])
    if(verify){
      ctx.body = {
        status: 402,
        msg:verify
      }
      return
    }
    ctx.body = await ctx.service.pc.good.good.addGood(body)
  }

  async editGood(){
    const {ctx} = this;
    const body = ctx.request.body;
    const verify = this.app.verify([
      {
        label:'id',
        value:body.id
      },
      {
        label:'goods',
        value:body.goods
      },
      {
        label: 'class_id',
        value:body.class_id
      },
      {
        label:'main_id',
        value:body.main_id
      },
      {
        label:'detail_id',
        value:body.detail_id,
      }
    ])
    if(verify){
      ctx.body = {
        status: 402,
        msg:verify
      }
      return
    }
    ctx.body = await ctx.service.pc.good.good.editGood(body)
  }

  async goodList(){
    this.ctx.body= await this.ctx.service.pc.good.good.goodList();
  }

  /**
   *
   * @query img 图片id（逗号隔开）
   */
  async getImg(){
    const {ctx} = this;
    ctx.body = await ctx.service.pc.good.good.getImg(ctx.query);
  }
}

module.exports = Good
