import ApiError from "@errors/ApiError";
import {CreateTaskDto} from "@entities/dto/CreateTaskDto";
import db from "@utils/sequelize";
import IDatabase from "@entities/interfaces";
import {Filterable} from "sequelize";
import logger from "@utils/logger";

export class StatusesRepository {
    constructor(private _db: any = db) { }

    async findOneByName(statusName: string) {
        try{
            logger.info("StatusesRepository::findOneByName")
            const status = await this._db.Status.findOne({ where: { name: statusName } });
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
}