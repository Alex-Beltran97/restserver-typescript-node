import { Sequelize } from 'sequelize';

const db = new Sequelize("node", "root", "Alex091097*code", {
  host: "localhost",
  dialect: "mysql",
  // logging: false
});

export default db;