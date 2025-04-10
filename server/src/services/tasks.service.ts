import {TasksRepository} from "@repositories/tasks.repository";
import {CreateTaskDto} from "@entities/dto/CreateTaskDto";
import { ITask } from "@entities/interfaces";
import logger from "@utils/logger";
import {StatusesService} from "@services/statuses.service";

export class TasksService {
    private _tasksRepository: TasksRepository;
    private _statusesService: StatusesService;

    constructor() {
        this._tasksRepository = new TasksRepository();
        this._statusesService = new StatusesService();
    }

    async create(createTaskDto: CreateTaskDto) {
        logger.info("TasksService::create")
        // Find task status if exists in CreateTaskDto
        let status;
        if (createTaskDto.status) {
            logger.info(`Try find status: ${createTaskDto.status}`)
            status = await this._statusesService.findOne({ name: createTaskDto.status});
        } else {
            logger.info(`Status default: ${createTaskDto.status}`)
            status = await this._statusesService.findOne({ name: "pending"});
        }

        // Create and return task
        const task: ITask = {
            title: createTaskDto.title,
            description: createTaskDto.description,
            comment: createTaskDto.comment || null,
            statusId: status.id
        }
        return await this._tasksRepository.create(task);
    }


    async getById(taskId: number) {
        logger.info("TasksService::getById")
        // Find task by id
        return await this._tasksRepository.findByPk(taskId);
    }
}