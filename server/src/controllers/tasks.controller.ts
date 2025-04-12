import {NextFunction, Request, Response} from 'express';
import {TasksService} from "@services/tasks.service";
import logger from "@utils/logger";
import {
    CreateTaskDto, PatchUpdateTaskFixedDto,
} from "@entities/dto/task.dto";
import ApiError from "@errors/ApiError";

export class TasksController {
    private _taskService: TasksService;

    constructor(taskService: TasksService) {
        this._taskService = taskService;
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::create")
            const createTaskDto: CreateTaskDto = req.body;
            const tasks = await this._taskService.create(createTaskDto);
            return res
                .status(201)
                .json({tasks});
        } catch (error) {
            next(error);
        }
    }


    async patchUpdateFixed(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::patchUpdate")
            const id = parseInt(req.params.id, 10);
            if (isNaN(id) || id <= 0) {
                throw ApiError.badRequestError("Task Id is not valid or not provided")
            }
            const patchUpdateTaskDto: PatchUpdateTaskFixedDto = req.body;

            const task = await this._taskService.patchUpdate(id, patchUpdateTaskDto);
            return res
                .status(204)
                .end()
                // .json({task});
        } catch (error) {
            next(error);
        }
    }


    async abortAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::abortAll")
            const tasks = await this._taskService.abortAll();
            return res
                .status(204)
                .end()
                // .json({tasks});
        } catch (error) {
            next(error);
        }
    }
}