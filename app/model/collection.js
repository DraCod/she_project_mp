module.exports = app =>{
  const { INTEGER, DATE,STRING } = app.Sequelize;
  const Collection = app.model.define('collections',{
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    userId:INTEGER,
    goodId:INTEGER,
    createdAt:DATE,
    updatedAt:DATE,
  })

  const Goods = app.model.define('goods',{
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    goods:STRING,
    price:STRING,
    classId:INTEGER,
    mainId:INTEGER,
    pathId:STRING,
    detailId:STRING,
    total:INTEGER,
    buy:INTEGER,
    createdAt: DATE,
    updatedAt: DATE,
  })

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

  Collection.belongsTo(Goods,{
    foreignKey:'goodId',
    targetKey:'id',
    as:'good'
  })

  Goods.belongsTo(Img,{
    foreignKey:'mainId',
    targetKey:'id',
    as:'main'
  })
  return Collection
}