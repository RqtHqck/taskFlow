import {TasksRepository} from "@repositories/tasks.repository";
import {
    CreateTaskDto,
    PatchUpdateTaskFixedDto,
} from "@entities/dto/task.dto";
import {IGetAllRequestFilter, IStatus, ITask, ITaskUpdate} from "@entities/interfaces";
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
        const createObj: ITask = {
            title: createTaskDto.title,
            description: createTaskDto.description,
            statusId: status.id!
        }
        const filter = { title: createObj.title }
        return await this._tasksRepository.create(createObj, filter);
    }


    async getAll(filter: IGetAllRequestFilter) {
        logger.info("TasksService::getAll");
        if (Object.keys(filter).length == 0) {
            return await this._tasksRepository.getAll();
        }
        return await this._tasksRepository.getAll(filter);

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
        const filter = { id: updateObj.id }
        return await this._tasksRepository.update(updateObj, filter);
    }


    async abortAll() {
        logger.info("TasksService::abortAll")
        const statusAbort: IStatus = await this._statusesService.findOne({ name: StatusEnum.ABORTED });
        const statusProcessing: IStatus = await this._statusesService.findOne({ name: StatusEnum.PROCESSING });

        const updateObj: ITaskUpdate = {
            statusId: statusAbort.id!
        }
        const filter = {
            statusId: statusProcessing.id
        }

        return await this._tasksRepository.bulkUpdate(updateObj, filter);
    }
}