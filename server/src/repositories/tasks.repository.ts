import ApiError from "@errors/ApiError";
import db from "@utils/sequelize";
import { ITask } from "@entities/interfaces";
import logger from "@utils/logger";

export class TasksRepository {
    constructor(private _db: any = db) { }

    async create(createTaskDto: ITask) {
        try{
            logger.info(`TasksRepository::create dto: ${JSON.stringify(createTaskDto)}`);
            return await this._db.Task.create(createTaskDto);
        } catch(err) {
            throw ApiError.databaseError("Error create task", err);
        }
    }

    async findByPk(id: number) {
        try{
            logger.info(`TasksRepository::findByPk pk:${id}`)
            const task = await this._db.Task.findByPk(id);
            if (!task) {
                throw ApiError.notFoundError(`Not found task with id: ${id}`);
            }
            console.log(task)
            return task;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError(`Error findById id: ${id} task`, err);
        }
    }

}