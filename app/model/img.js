'use strict';

module.exports = app =>{
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Img = app.model.define('imgs',{
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    path:STRING,
    createdAt: DATE,
    updatedAt: DATE,
  })
  return Img
}
