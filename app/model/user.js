'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('users', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    userName: STRING,
    openId: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  });
  return User;
};
