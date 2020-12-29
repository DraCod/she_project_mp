const Controller = require('egg').Controller;
const md5 = require('md5');
const Path = require('path');
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');



class Text extends Controller{
  async editText(){
    const {ctx} = this;
    const {body} = ctx.request;
    console.log(this.getIPAddress());
    ctx.body = await ctx.service.pc.text.text.editText(body);
  }

  //  获取ip地址
  getIPAddress(){
    let interfaces = require('os').networkInterfaces();
    for(let devName in interfaces){
      let face = interfaces[devName];
      for(let i=0;i<face.length;i++){
        let alias = face[i];
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
          return alias.address;
        }
      }
    }
  }

  async getText(){
    const {ctx} = this;
    const {query} = ctx;
    ctx.body = await ctx.service.pc.text.text.getText(query);
  }

  async uploadImg(){
    const {ctx} = this;
    const stream = await ctx.getFileStream();
    const filename = md5(stream.filename) +new Date().getTime()+Path.extname(stream.filename).toLocaleLowerCase();
    const target = Path.join(this.config.baseDir,'app/public',filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    let path = await ctx.service.pc.good.good.upload('public/' + filename)
    ctx.body = {
      errno:0,
      data:[
        `http://${this.getIPAddress()}:7001/${path.dataValues.path}`
      ]
    }
    // path = path.dataValues.path;
  }
}

module.exports = Text;