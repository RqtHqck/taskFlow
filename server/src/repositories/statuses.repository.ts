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
            logger.info("StatusesRepository::findAll")
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
            logger.info("StatusesRepository::findOne")
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



    async createOne(createStatus: IStatus) {
        try{
            logger.info("StatusesRepository::createOne")
            const [status, created] = await this._db.Status.findOrCreate({
                where: {name: createStatus.name},
                defaults: createStatus
            });
            if (!created) {
                throw ApiError.conflictError(`Status with {name: ${createStatus.name}} exists`);
            }
            return status;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find status", err);
        }
    }


    async createMany(createStatuses: IStatus[]) {
        try{
            logger.info("StatusesRepository::createMany")
            return await this._db.Status.bulkCreate(createStatuses);
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find status", err);
        }
    }
}