import ApiError from "@errors/ApiError";
import db from "@utils/sequelize";
import {IGetAllRequestFilter, ITask, ITaskUpdate} from "@entities/interfaces";
import logger from "@utils/logger";
import {Op} from "sequelize";


export class TasksRepository {
    constructor(private _db: any = db) { }

    async create(createTaskObj: ITask, filter: object | {}) {
        try{
            logger.info(`TasksRepository::create dto: ${JSON.stringify(createTaskObj)}, filter: ${JSON.stringify(filter)}`);

            const [task, created] = await this._db.Task.findOrCreate({
                where: filter,
                defaults: createTaskObj
            });

            if (!created) {
                throw ApiError.conflictError(`Task ${JSON.stringify(createTaskObj.title)} exists`);
            }
            return task;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError("Error create task", err);
        }
    }


    async getAll(filter?: IGetAllRequestFilter) {
        try{
            logger.info(`TasksRepository::getAll filter: ${JSON.stringify(filter)}`);
            let tasks;
            if (filter) {
                logger.info(`filter provided`);
                if (filter.dateTo && filter.dateFrom) {
                    tasks = await this._db.Task.findAll({
                        where: {
                            createdAt: {
                                [Op.between] : [ filter.dateFrom , filter.dateTo ]
                            }
                        }
                    })
                } else if (filter.date) {
                    tasks = await this._db.Task.findAll({
                        where: {
                            createdAt: filter.date
                        }
                    })
                }
            } else {
                tasks = await this._db.Task.findAll();
            }
            return tasks;
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError(`Error getAll tasks ${ filter ? "with filter: " + JSON.stringify(filter) : "without filter"}`, err);
        }
    }


    async update(updateTaskObj: ITaskUpdate, filter: object | {}) {
        try{
            logger.info(`TasksRepository::update dto: ${JSON.stringify(updateTaskObj)}, filter: ${JSON.stringify(filter)}`)

            const [affectedCount, updatedTasks] = await this._db.Task.update(
                updateTaskObj, {
                    where: filter,
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


    async bulkUpdate(updateTaskObj: ITaskUpdate, filter: object | {}) {
        try {
            logger.info(`TasksRepository::bulkUpdate dto: ${JSON.stringify(updateTaskObj)}, filter: ${JSON.stringify(filter)}`);

            const [affectedCount] = await this._db.Task.update(
                updateTaskObj,
                {
                    where: filter,
                }
            );

            logger.info(`Affected fields count: ${affectedCount}`);
            return { affectedCount };
        } catch (err) {
            if (err instanceof ApiError) {
                throw err;
            }
            throw ApiError.databaseError(`Error bulk update tasks`, err);
        }
    }

}