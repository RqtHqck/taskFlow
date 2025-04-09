import {NextFunction, Request, Response} from 'express';
import {TasksService} from "@services/tasks.service";
import ApiError from "@errors/ApiError";
import logger from "@utils/logger";
import ITask from "../entities/interfaces";
import {CreateTaskDto} from "@entities/dto/CreateTaskDto";

export class TasksController {
    private _taskService: TasksService;

    constructor(taskService: TasksService) {
        this._taskService = taskService;
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const taskDto: CreateTaskDto = req.body;
            const tasks = await this._taskService.create(taskDto);
            return res
                .status(200)
                .json({tasks});
        } catch (error) {
            next(error);
        }
    }

}