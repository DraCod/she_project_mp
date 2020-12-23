module.exports = app =>{
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Comment = app.model.define('comment',{
    id:{
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    goodId:INTEGER,
    userId:STRING,
    imgId:STRING,
    content:STRING,
    num:INTEGER,
    createdAt:DATE,
    updatedAt:DATE,
  })


  const User = app.model.define('users', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    userName:STRING,
    avatarUrl:STRING,
    openId: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  });

  Comment.belongsTo(User,{
    foreignKey:'userId',
    targetKey:'id',
    as:'user'
  })
  return Comment
}
