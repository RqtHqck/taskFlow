import {NextFunction, Request, Response} from 'express';
import {TasksService} from "@services/tasks.service";
import logger from "@utils/logger";
import {
    CreateTaskDto,
    PatchUpdateAllTasksStatusDto,
    PatchUpdateTaskDto,
    UpdateTaskDto,
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


    async update(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::update")
            const updateTaskDto: UpdateTaskDto = req.body;
            const task = await this._taskService.update(updateTaskDto);
            return res
                .status(204)
                // .json({task});
        } catch (error) {
            next(error);
        }
    }


    async patchUpdate(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::patchUpdate")
            const patchUpdateTaskDto: PatchUpdateTaskDto = req.body;
            const task = await this._taskService.patchUpdate(patchUpdateTaskDto);
            return res
                .status(204)
                .end()
                // .json({task});
        } catch (error) {
            next(error);
        }
    }


    async bulkAbortAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::bulkAbortAll")
            const tasks = await this._taskService.bulkAbortAll();
            return res
                .status(204)
                .end()
                // .json({tasks});
        } catch (error) {
            next(error);
        }
    }
}