import ApiError from "@errors/ApiError";
import logger from "@utils/logger";
import {Service} from "typedi";
import TaskModel from "@models/task.model";


@Service()
export class TasksRepository {
    constructor(public model: TaskModel) { }

}