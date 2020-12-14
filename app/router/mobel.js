module.exports = app =>{
  const { router, controller } = app;
  // const jwt = app.middleware.jwt(app.config.jwt);
  router.post('/mb/login', controller.login.mpLogin.login);//微信登录


  router.post('/mb/add-car', controller.mb.shopcar.shopcar.addCar)//添加购物车
  router.post('/mb/remove-car', controller.mb.shopcar.shopcar.removeCar)//添加购物车


  router.post('/mb/add-address', controller.mb.address.address.addAddress)//添加地址
  router.post('/mb/edit-address', controller.mb.address.address.editAddress)//修改地址



  router.post('/mb/preview-order', controller.mb.order.order.previewOrder)//预览订单
  router.get('/mb/order-detail', controller.mb.order.order.orderDetail)//订单订单详情
  router.post('/mb/create-order', controller.mb.order.order.createOrder)//创建订单
  router.post('/mb/edit-order', controller.mb.order.order.editOrder)//修改订单状态
}
