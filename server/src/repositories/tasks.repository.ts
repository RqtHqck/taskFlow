import ApiError from "@errors/ApiError";
import db from "@utils/sequelize";
import {ITask, ITaskUpdate} from "@entities/interfaces";
import logger from "@utils/logger";


export class TasksRepository {
    constructor(private _db: any = db) { }

    async create(createTaskObj: ITask) {
        try{
            logger.info(`TasksRepository::create dto: ${JSON.stringify(createTaskObj)}`);
            const [task, created] = await this._db.Task.findOrCreate({
                where: { title: createTaskObj.title },
                defaults: createTaskObj
            });
            if (!created) {
                throw ApiError.conflictError(`Task ${JSON.stringify(createTaskObj)} exists`);
            }
            return task;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
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
            return task;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError(`Error findById id: ${id} task`, err);
        }
    }


    async update(updateTaskObj: ITaskUpdate) {
        try{
            logger.info(`TasksRepository::update dto: ${JSON.stringify(updateTaskObj)}`)
            const [affectedCount, updatedTasks] = await this._db.Task.update(
                updateTaskObj, {
                    where: { id: updateTaskObj.id },
                    returning: true
                }
            );
            logger.info(`Affected fields count: ${affectedCount}`);
            if (affectedCount === 0) {
                throw ApiError.notFoundError("Task not found or not updated");
            }
            return updatedTasks[0]
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError(`Error update task`, err);
        }
    }
}