import { Sequelize } from "sequelize-typescript";
import dbConfig from "@config/dbConfig";
import Task from "@models/task.model"
import Status from "@models/status.model";
import logger from "@utils/logger";


const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    timezone: dbConfig.timezone,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: dbConfig.logging,
    models: dbConfig.models,
});

(async ()=>{
    await sequelize.authenticate({ logging: true });
    sequelize.sync({ force: false, logging: true }).then(() => {
        logger.info("Database synchronized");
    });

})()

const db = {
    sequelize,
    Task,
    Status,
};

export default db;
