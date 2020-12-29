/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.keys = appInfo.name + '_1606745514248_8278';
  config.middleware = [];
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  const userConfig = {
    // myAppName: 'egg',
    jwt: {
      secret: 'cbl',
    },
    AppID: 'wx40b71b0949c69393',
    AppSecret: '7bcb383f2549adb22e44d18cd365de9e', // AppSecret(小程序密钥)
    sequelize: {
      dialicet: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'for_she',
      password: '12345678',
      timezone: '+08:00'
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
