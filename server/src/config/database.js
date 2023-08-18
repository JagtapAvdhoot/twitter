
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: "postgres",
    dialect: "postgres",
    username: process.env.PG_USERNAME,
    host: "localhost",
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

const testDbConnection = async () => {
    try {
        await sequelize.authenticate({ benchmark: true, logging: false });
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = {
    sequelize, testDbConnection
}

