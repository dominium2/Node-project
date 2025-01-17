import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // or 'sqlite', 'postgres', 'mssql'
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database is successfull.');
    } catch (error) {
        console.error("can't connect to the database:", error);
    }
};

export { sequelize, connectDatabase };