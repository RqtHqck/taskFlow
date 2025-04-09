import ApiError from "@errors/ApiError";
import {CreateTaskDto} from "@entities/dto/CreateTaskDto";
import db from "@utils/sequelize";
import ITask from "@entities/interfaces";

export class TasksRepository {
    constructor(private _db: any = db) { }

    async create(createTaskDto: ITask) {
        try{
            return await this._db.Task.create(createTaskDto);
        } catch(err) {
            throw ApiError.databaseError("Error create task", err);
        }
    }

}