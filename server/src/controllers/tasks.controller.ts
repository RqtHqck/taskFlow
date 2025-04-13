import {NextFunction, Request, Response} from 'express';
import {TasksService} from "@services/tasks.service";
import logger from "@utils/logger";
import {
    AbortTaskDto,
    CreateTaskDto, DoneTaskDto,
} from "@entities/dto/task.dto";
import ApiError from "@errors/ApiError";
import {IGetAllRequestFilter} from "@entities/interfaces";

export class TasksController {
    private _taskService: TasksService;

    constructor(taskService: TasksService) {
        this._taskService = taskService;
    }

    async createTask(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::create")
            const createTaskDto: CreateTaskDto = req.body;
            const tasks = await this._taskService.createTask(createTaskDto);
            return res
                .status(201)
                .json({tasks});
        } catch (error) {
            next(error);
        }
    }


    async getAllTasks(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::getAll")
            const filter: IGetAllRequestFilter = req.query;
            const tasks = await this._taskService.getAllTasks(filter);
            return res
                .status(200)
                .json({tasks});
        } catch (error) {
            next(error);
        }
    }


    async processTask(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::processTask")
            const id = parseInt(req.params.id, 10);

            const task = await this._taskService.processTask(id);
            return res
                .status(204)
                .end()
                // .json({task});
        } catch (error) {
            next(error);
        }
    }


    async doneTask(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::doneTask")
            const id = parseInt(req.params.id, 10);
            const dto: DoneTaskDto = req.body;

            const task = await this._taskService.doneTask(id, dto);
            return res
                .status(204)
                .end()
            // .json({task});
        } catch (error) {
            next(error);
        }
    }


    async abortTask(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::abortTask")
            const id = parseInt(req.params.id, 10);
            const dto: AbortTaskDto = req.body;

            const task = await this._taskService.abortTask(id, dto);
            return res
                .status(204)
                .end()
            // .json({task});
        } catch (error) {
            next(error);
        }
    }


    async abortAllTask(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("TasksController::abortAllTasks")
            const tasks = await this._taskService.abortAllTasks();
            return res
                .status(204)
                .end()
                // .json({tasks});
        } catch (error) {
            next(error);
        }
    }
}