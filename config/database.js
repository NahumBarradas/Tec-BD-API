require('dotenv').config();

module.exports = {
    //Configuración de base de datos
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,

    //Configurar seeders
    seederStorage: "sequelize",
    seederStorageTableName: "seeds",

    //Configuración de migraciones
    migrationStorage: "sequelize",
    migrationStorageTableName: "migrations",
}
