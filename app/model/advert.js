module.exports = app =>{
  const { STRING, INTEGER, DATE ,FLOAT } = app.Sequelize;
  const Advert = app.model.define('advert', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    img:INTEGER,
    type:INTEGER,
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

  Advert.belongsTo(Img,{
    foreignKey:'img',
    targetKey:'id',
    as:'path'
  })
  return Advert;
}