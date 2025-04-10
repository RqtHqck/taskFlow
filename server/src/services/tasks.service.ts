import {TasksRepository} from "@repositories/tasks.repository";
import {CreateTaskDto, UpdateTaskDto} from "@entities/dto/task.dto";
import {ITask, ITaskUpdate} from "@entities/interfaces";
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
        const taskObj: ITask = {
            title: createTaskDto.title,
            description: createTaskDto.description,
            comment: createTaskDto.comment || null,
            statusId: status.id
        }
        return await this._tasksRepository.create(taskObj);
    }


    async getById(taskId: number) {
        logger.info("TasksService::getById")
        // Find task by id
        return await this._tasksRepository.findByPk(taskId);
    }


    async update(updateTaskDto: UpdateTaskDto) {
        logger.info("TasksService::update")
        // Find task status if exists in CreateTaskDto
        let status;
        if (updateTaskDto.status) {
            logger.info(`Try find status: ${updateTaskDto.status}`)
            status = await this._statusesService.findOne({ name: updateTaskDto.status});
        }
        const updateObj: ITaskUpdate = {
            id: updateTaskDto.id,
            title: updateTaskDto.title,
            description: updateTaskDto.description,
            comment: updateTaskDto.comment,
        }
        if (status && status.id) {
            updateObj.statusId = status.id
        }
        return await this._tasksRepository.update(updateObj);
    }
}