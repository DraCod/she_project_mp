module.exports = app =>{
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Order = app.model.define('order',{
    id:{
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    userId:STRING,
    addressId:INTEGER,
    goodList:STRING,
    status:INTEGER,
    orderNum:STRING,
    createdAt:DATE,
    updatedAt:DATE,
  })

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

  Order.belongsTo(Address,{
    foreignKey:'addressId',
    targetKey:'id',
    as:'address'
  })
  return Order
}