const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("newProject", "root", "keemdahun01", {
  host: "127.0.0.1",
  port: "3306",
  dialect: "mysql",
});

auto.run();
