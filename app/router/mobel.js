module.exports = app =>{
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  router.post('/mb/login', controller.login.mpLogin.login);//微信登录


  router.post('/mb/add-car', controller.mb.shopcar.shopcar.addCar)//添加购物车
  router.post('/mb/remove-car', controller.mb.shopcar.shopcar.removeCar)//添加购物车


  router.get('/mb/address-list',jwt, controller.mb.address.address.addressList)//地址列表
  router.post('/mb/add-address',jwt, controller.mb.address.address.addAddress)//添加地址
  router.get('/mb/address-detail',jwt,controller.mb.address.address.addressDetail)//地址详情
  router.post('/mb/edit-address',jwt, controller.mb.address.address.editAddress)//修改地址
  router.post('/mb/remove-address',jwt,controller.mb.address.address.removeAddress)//删除地址



  router.post('/mb/preview-order',jwt, controller.mb.order.order.previewOrder)//预览订单
  router.get('/mb/order-detail',jwt, controller.mb.order.order.orderDetail)//订单订单详情
  router.post('/mb/create-order',jwt, controller.mb.order.order.createOrder)//创建订单
  router.post('/mb/edit-order', controller.mb.order.order.editOrder)//修改订单状态


  router.get('/mb/order-status',jwt,controller.mb.order.order.orderStatus)//个人订单状态
  router.get('/mb/order-list',jwt,controller.mb.order.order.orderList)//订单列表


  router.get('/mb/collection-list',jwt,controller.mb.collection.collection.collectionList)//收藏列表
  router.post('/mb/add-collection',jwt,controller.mb.collection.collection.addCollection)//添加收藏
  router.post('/mb/remove-collection',controller.mb.collection.collection.removeCollection,jwt)//取消收藏

  router.get('/mb/search-list',controller.mb.good.good.searchList)//搜索列表
}
