'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE ,FLOAT } = app.Sequelize;
  const User = app.model.define('users', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    userName:STRING,
    otherName:STRING,
    avatarUrl:STRING,
    password:STRING,
    openId: STRING,
    giveWallet:FLOAT,
    rechargeWallet:FLOAT,
    createdAt: DATE,
    updatedAt: DATE,
  });
  return User;
};
