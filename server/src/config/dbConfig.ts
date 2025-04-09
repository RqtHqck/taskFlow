import logger from '@utils/logger';
import {Dialect} from "sequelize";
import Task from "@models/task.model";
import Status from "@models/status.model";
import {Model, ModelStatic} from "sequelize-typescript";

export interface IDbConfig {
    database: string;
    user: string;
    password: string;
    host: string;
    port: number;
    timezone: string;
    dialect: Dialect;
    pool: {
        max: number;
        min: number;
        acquire: number;
        idle: number;
    };
    logging: (msg: string) => any;
    models: string[];
}


const dbConfig: IDbConfig = {
    database: process.env.POSTGRES_DB!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    timezone: '+03:00',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: (msg: string) => logger.info(msg),
    models: [__dirname + '/**/*.model.ts']

}

export default dbConfig;
