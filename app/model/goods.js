'use strict';

module.exports = app=>{
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Goods = app.model.define('goods',{
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    goods:STRING,
    class_id:INTEGER,
    main_id:INTEGER,
    path_id:STRING,
    detail_id:STRING,
    total:INTEGER,
    buy:INTEGER,
    createdAt: DATE,
    updatedAt: DATE,
  })

  const Classify = app.model.define('classifys',{
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    classify:STRING,
    createdAt: DATE,
    updatedAt: DATE,
  });

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
  Goods.belongsTo(Classify,{
    foreignKey:'class_id',
    targetKey:'id',
    as:'class'
  })
  Goods.belongsTo(Img,{
    foreignKey:'main_id',
    targetKey:'id',
    as:'main'
  })
  return Goods;
}
