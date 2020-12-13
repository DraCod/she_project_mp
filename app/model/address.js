module.exports = app =>{
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Address = app.model.define('addresses',{
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    userId:STRING,
    consignee:STRING,
    tel:STRING,
    provincial:STRING,
    market:STRING,
    regional:STRING,
    address:STRING,
    allAddress:STRING,
    default:{
      defaultValue:0,
      type:INTEGER
    },
    createdAt:DATE,
    updatedAt:DATE
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

  Address.belongsTo(User,{
    foreignKey:'userId',
    targetKey:'id',
    as:'user'
  })
  return Address
}