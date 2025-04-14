import ApiError from "@errors/ApiError";
import db from "@utils/sequelize";
import {IStatus} from "@entities/interfaces";
import logger from "@utils/logger";


export class StatusesRepository {

    constructor(private _db: any = db) { }


    async findOne(filter: any) {
        try{
            logger.info(`StatusesRepository::findOne filter: ${JSON.stringify(filter)}`)
            const status = await this._db.Status.findOne({
                where: filter
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


    async createMany(createStatuses: IStatus[]) {
        try{
            logger.info(`StatusesRepository::createMany dto ${JSON.stringify(createStatuses)}`);
            // If exists ignore
            await this._db.Status.bulkCreate(createStatuses, { ignoreDuplicates: true });
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create status", err);
        }
    }
}