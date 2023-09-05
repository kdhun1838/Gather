"use strict";
const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto("Mo2Da", "root", "edurootroot", {
    host: "docs.yi.or.kr",
    port: "9086",
    dialect: "mysql",
});
auto.run();
