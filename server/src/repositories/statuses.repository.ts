import ApiError from "@errors/ApiError";
import db from "@utils/sequelize";
import {IStatus} from "@entities/interfaces";
import logger from "@utils/logger";

export class StatusesRepository {
    constructor(private _db: any = db) { }

    async findOneByName(statusName: string) {
        try{
            logger.info("StatusesRepository::findOneByName")
            const status = await this._db.Status.findOne({
                where: { name: statusName }
            });
            if (!status) {
                throw ApiError.notFoundError(`Status ${statusName} not found`);
            }
            return status;
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
            const status = await this._db.Status.bulkCreate(createStatuses);
            return status;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error find status", err);
        }
    }
}