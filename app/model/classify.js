'use strict';

module.exports = app=>{
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Classify = app.model.define('classifys',{
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    classify:STRING,
    createdAt: DATE,
    updatedAt: DATE,
  })
  return Classify;
}
