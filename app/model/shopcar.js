'use strict';

module.exports = app =>{
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Shopcar = app.model.define('shopcars',{
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    goodId:INTEGER,
    num:INTEGER,
    userId:INTEGER,
    createdAt: DATE,
    updatedAt: DATE,
  })

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

  Shopcar.belongsTo(Goods,{
    foreignKey:'goodId',
    targetKey:'id',
    as:'good',
  })
  Shopcar.belongsTo(User,{
    foreignKey:'userId',
    targetKey:'id',
    as:'user',
  })

  return Shopcar
}