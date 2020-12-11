module.exports = app =>{
  const { router, controller } = app;
  // const jwt = app.middleware.jwt(app.config.jwt);
  router.post('/mb/login', controller.login.mpLogin.login);//微信登录

  router.post('/mb/add-car', controller.mb.shopcar.shopcar.addCar)//添加购物车
  router.post('/mb/remove-car', controller.mb.shopcar.shopcar.removeCar)//添加购物车
}
