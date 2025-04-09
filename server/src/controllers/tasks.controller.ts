import ApiError from "@errors/ApiError";
import logger from "@utils/logger";
import { JsonController, Get, Param, } from 'routing-controllers';
import 'reflect-metadata';
import { Service } from 'typedi';
import {TasksService} from "@services/tasks.service";

@Service()
@JsonController()
export class TasksController {
    constructor(public taskService: TasksService) { }
    
}