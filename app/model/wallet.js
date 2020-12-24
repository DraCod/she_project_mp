module.exports = app => {
  const { STRING, INTEGER, DATE,FLOAT  } = app.Sequelize;
  const Wallet = app.model.define('wallet', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    userId:INTEGER,
    content:STRING,
    type:INTEGER,
    num:FLOAT,
    createdAt: DATE,
    updatedAt: DATE,
  });
  return Wallet;
};
