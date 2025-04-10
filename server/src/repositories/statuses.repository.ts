import ApiError from "@errors/ApiError";
import db from "@utils/sequelize";
import {IStatus} from "@entities/interfaces";
import logger from "@utils/logger";

export class StatusesRepository {
    constructor(private _db: any = db) { }

    async getAll() {
        try{
            logger.info("StatusesRepository::getAll")
            return await this._db.Status.findAll();
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find status", err);
        }
    }


    async findAll(filter: any) {
        try{
            logger.info(`StatusesRepository::findAll filter: ${JSON.stringify(filter)}`)
            const status = await this._db.Status.findAll({
                where: filter  // фильтрация по любому полю
            });
            if (!status) {
                throw ApiError.notFoundError(`Statuses by filter: ${JSON.stringify(filter)} not found`);
            }
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find statuses", err);
        }
    }

    async findOne(filter: any) {
        try{
            logger.info(`StatusesRepository::findOne filter: ${JSON.stringify(filter)}`)
            const status = await this._db.Status.findOne({
                where: filter  // фильтрация по любому полю
            });
            if (!status) {
                throw ApiError.notFoundError(`Status by filter: ${JSON.stringify(filter)} not found`);
            }
            return status
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find status", err);
        }
    }



    async createOne(createStatusObj: IStatus) {
        try{
            logger.info(`StatusesRepository::createOne dto:${JSON.stringify(createStatusObj)}`);
            const [status, created] = await this._db.Status.findOrCreate({
                where: { name: createStatusObj.name },
                defaults: createStatusObj
            });
            if (!created) {
                throw ApiError.conflictError(`Status ${JSON.stringify(createStatusObj)} exists`);
            }
            return status;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create status", err);
        }
    }


    async createMany(createStatuses: IStatus[]) {
        try{
            logger.info(`StatusesRepository::createMany dto ${JSON.stringify(createStatuses)}`);
            return await this._db.Status.bulkCreate(createStatuses);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create status", err);
        }
    }
}