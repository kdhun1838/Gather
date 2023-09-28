const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("Mo2Da", "root", "edurootroot", {
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: "mysql",
});

auto.run();
