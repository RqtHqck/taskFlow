import {NextFunction, Request, Response} from 'express';
import {TasksService} from "@services/tasks.service";
import logger from "@utils/logger";
import {CreateTaskDto} from "@entities/dto/CreateTaskDto";
import ApiError from "@errors/ApiError";

export class TasksController {
    private _taskService: TasksService;

    constructor(taskService: TasksService) {
        this._taskService = taskService;
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::create")
            const taskDto: CreateTaskDto = req.body;
            const tasks = await this._taskService.create(taskDto);
            return res
                .status(200)
                .json({tasks});
        } catch (error) {
            next(error);
        }
    }


    async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::getById")
            const taskId = parseInt(req.params.taskId, 10);
            if (isNaN(taskId)) {
                throw ApiError.badRequestError("TaskId must be type of integer");
            }
            const task = await this._taskService.getById(taskId);
            return res
                .status(200)
                .json({task});
        } catch (error) {
            next(error);
        }
    }
}