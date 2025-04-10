import ApiError from "@errors/ApiError";
import db from "@utils/sequelize";
import { ITask } from "@entities/interfaces";
import logger from "@utils/logger";

export class TasksRepository {
    constructor(private _db: any = db) { }

    async create(createTaskDto: ITask) {
        try{
            logger.info("TasksRepository::create")
            return await this._db.Task.create(createTaskDto);
        } catch(err) {
            throw ApiError.databaseError("Error create task", err);
        }
    }

}