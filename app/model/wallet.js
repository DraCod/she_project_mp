module.exports = app => {
  const { STRING, INTEGER, DATE  } = app.Sequelize;
  const Wallet = app.model.define('wallet', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    userId:INTEGER,
    content:STRING,
    createdAt: DATE,
    updatedAt: DATE,
  });
  return Wallet;
};
