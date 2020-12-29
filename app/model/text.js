'use strict';

module.exports = app => {
  const {  INTEGER, DATE ,TEXT } = app.Sequelize;
  const Text = app.model.define('text', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
    },
    content:TEXT,
    createdAt: DATE,
    updatedAt: DATE,
  });
  return Text;
};
