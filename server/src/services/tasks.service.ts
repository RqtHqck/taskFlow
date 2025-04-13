import {TasksRepository} from "@repositories/tasks.repository";
import {
    CreateTaskDto,
    PatchUpdateTaskFixedDto,
} from "@entities/dto/task.dto";
import {IStatus, ITask, ITaskUpdate} from "@entities/interfaces";
import logger from "@utils/logger";
import {StatusesService} from "@services/statuses.service";
import {StatusEnum} from "@entities/enums";

export class TasksService {
    private _tasksRepository: TasksRepository;
    private _statusesService: StatusesService;

    constructor() {
        this._tasksRepository = new TasksRepository();
        this._statusesService = new StatusesService();
    }

    async create(createTaskDto: CreateTaskDto) {
        logger.info("TasksService::create")
        // Find status
        const status: IStatus = await this._statusesService.findOne({ name: StatusEnum.PENDING });
        // Create and return task
        const taskObj: ITask = {
            title: createTaskDto.title,
            description: createTaskDto.description,
            statusId: status.id!
        }
        return await this._tasksRepository.create(taskObj);
    }


    async patchUpdate(id: number, patchDto: PatchUpdateTaskFixedDto) {
        logger.info("TasksService::patchUpdate")

        const updateObj: ITaskUpdate = { id };
        if (patchDto.comment) {
            updateObj.comment = patchDto.comment
        }
        // Find task status
        const status: IStatus = await this._statusesService.findOne({ name: patchDto.status});
        updateObj.statusId = status.id!

        return await this._tasksRepository.update(updateObj);
    }


    async abortAll() {
        logger.info("TasksService::abortAll")
        const status: IStatus = await this._statusesService.findOne({ name: StatusEnum.ABORTED });
        const updateObj: ITaskUpdate = {
            statusId: status.id!
        }
        return await this._tasksRepository.bulkUpdate(updateObj);
    }

}