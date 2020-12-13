const Controller = require('egg').Controller;

class Address extends Controller{
  verify(arr,body){
    const {ctx} = this;
    const verify = this.app.verify(arr)
    if(verify){
      ctx.body = {
        status:402,
        msg:verify
      }
      return false
    }
    // const {id} = this.app.getUserId(ctx);
    const id = 1;
    body.allAddress = body.provincial+body.market+body.regional+body.address;
    body.userId = id;
    return body;
  }

  async addAddress(){
    let body = this.ctx.request.body;
    let verify_arr = [
      {
        label:'consignee',//收货人
        value:body.consignee
      },
      {
        label:'tel',//联系电话
        value:body.tel
      },
      {
        label:'provincial',//省
        value:body.provincial
      },
      {
        label:'market',//市
        value:body.market
      },
      {
        label:'regional',//区
        value:body.regional
      },
      {
        label:'address',//详细地址
        value:body.address
      },
      {
        label:'default',
        value:body.default,
        rule:(value)=>{
          if(value==0||value==1){
            return true
          }else{
            return false
          }
        },
        msg:'只能为1或0'
      }
    ];
    body = this.verify(verify_arr,body)
    if(body){
      this.ctx.body = await this.ctx.service.mb.address.address.addAddress(body);
    }
  }

  async editAddress(){
    let body = this.ctx.request.body;
    const verify_arr=[
      {
        label:'id',
        value:body.id,
      },
      {
        label:'consignee',//收货人
        value:body.consignee
      },
      {
        label:'tel',//联系电话
        value:body.tel
      },
      {
        label:'provincial',//省
        value:body.provincial
      },
      {
        label:'market',//市
        value:body.market
      },
      {
        label:'regional',//区
        value:body.regional
      },
      {
        label:'address',//详细地址
        value:body.address
      },
      {
        label:'default',
        value:body.default,
        rule:(value)=>{
          if(value==0||value==1){
            return true
          }else{
            return false
          }
        },
        msg:'只能为1或0'
      }
    ]
    body = this.verify(verify_arr,body)
    if(body){
      this.ctx.body = await this.ctx.service.mb.address.address.editAddress(body);
    }
  }
}

module.exports = Address