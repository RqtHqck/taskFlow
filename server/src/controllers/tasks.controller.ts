import {NextFunction, Request, Response} from 'express';
import {TasksService} from "@services/tasks.service";
import ApiError from "@errors/ApiError";
import logger from "@utils/logger";

export class TasksController {
    private _taskService: TasksService;

    constructor(taskService: TasksService) {
        this._taskService = taskService;
    }


}