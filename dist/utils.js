"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./models/User");
const typeorm_1 = require("typeorm");
const datasource = new typeorm_1.DataSource({
    type: "postgres",
    host: "db",
    username: "postgres",
    password: "supersecret",
    database: "postgres",
    synchronize: true,
    entities: [User_1.User],
    logging: ["query", "error"],
});
exports.default = datasource;
