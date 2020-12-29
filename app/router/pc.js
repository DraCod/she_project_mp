module.exports = app =>{
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);

  router.post('/pc/login', controller.login.administrator.login)//后台登录
  router.get('/pc/get-user-info', jwt, controller.pc.user.user.getUserInfo)//获取用户信息
  router.get('/pc/user-list',controller.pc.user.user.userList)//用户列表


  router.post('/pc/add-classify', controller.pc.good.good.addClassify)//添加分类
  router.get('/pc/classify-list', controller.pc.good.good.classList)//查询所有分类
  router.post('/pc/edit-classify', controller.pc.good.good.editClassify)//修改分类名称



  router.get('/pc/get-img',controller.pc.good.good.getImg)//获取图片



  router.post('/pc/upload', controller.pc.good.good.upload)//上传图片
  router.post('/pc/add-good',controller.pc.good.good.addGood)//添加商品
  router.post('/pc/edit-good',controller.pc.good.good.editGood)//修改商品
  router.get('/pc/good-list', controller.pc.good.good.goodList)//商品列表


  router.get('/pc/order-list',controller.pc.order.order.orderList)//订单列表


  router.get('/pc/good-detail',jwt,controller.pc.good.good.goodDetail)//商品详情
  router.post('/pc/give-wallet',controller.pc.user.user.giveWallet)//赠送金额


  router.get('/pc-advert-list',controller.mb.advert.advert.advertList)//广告列表
  router.post('/pc/add-advert',controller.mb.advert.advert.addAdvert)//添加广告
  router.post('/pc/remove-advert', controller.mb.advert.advert.removeAdvert)//删除广告

  router.get('/pc/feedback-list',controller.mb.setting.setting.feedbackList)//反馈列表


  router.post('/pc/edit-text',controller.pc.text.text.editText)//修改文本
  router.get('/pc/get-text',controller.pc.text.text.getText)//修改文本
  router.post('/pc/text-img-upload',controller.pc.text.text.uploadImg)//富文本图片上传
}
