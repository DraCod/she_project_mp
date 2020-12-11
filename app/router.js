'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const mb = require('./router/mobel');
const pc = require('./router/pc');
module.exports = app => {
  mb(app);
  pc(app);
};
