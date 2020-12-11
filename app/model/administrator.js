'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Administrator = app.model.define('administrators', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    name: STRING,
    username: STRING,
    password: STRING,
    avatar: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  });
  return Administrator;
};
