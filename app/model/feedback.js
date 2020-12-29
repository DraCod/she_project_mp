module.exports = app => {
  const { STRING, INTEGER, DATE ,TEXT,FLOAT } = app.Sequelize;
  const Feedback = app.model.define('feedbacks', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    userId:INTEGER,
    content:TEXT,
    createdAt: DATE,
    updatedAt: DATE,
  });

  const User = app.model.define('users', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    userName:STRING,
    otherName:STRING,
    avatarUrl:STRING,
    password:STRING,
    openId: STRING,
    giveWallet:FLOAT,
    rechargeWallet:FLOAT,
    createdAt: DATE,
    updatedAt: DATE,
  });

  Feedback.belongsTo(User,{
    foreignKey:'userId',
    targetKey:'id',
    as:'user'
  })
  return Feedback;
};
