import {TasksRepository} from "@repositories/tasks.repository";
import {StatusesRepository} from "@repositories/statuses.repository";
import {CreateTaskDto} from "@entities/dto/CreateTaskDto";
import ITask from "@entities/interfaces";
import logger from "@utils/logger";

export class TasksService {
    private _tasksRepository: TasksRepository;
    private _statusesRepository: StatusesRepository;

    constructor() {
        this._tasksRepository = new TasksRepository();
        this._statusesRepository = new StatusesRepository();
    }

    async create(createTaskDto: CreateTaskDto) {
        logger.info("TasksService::create")
        // Find task status if exists in CreateTaskDto
        let status;
        if (createTaskDto.status) {
            status = await this._statusesRepository.findOneByName(createTaskDto.status);
        }
        status = await this._statusesRepository.findOneByName("pending");

        // Create and return task
        const task: ITask = {
            title: createTaskDto.title,
            description: createTaskDto.description,
            comment: createTaskDto.comment || null,
            status_id: status.id
        }
        return await this._tasksRepository.create(task);
    }
}