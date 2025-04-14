import {TasksRepository} from "@repositories/tasks.repository";
import {
    AbortTaskDto,
    CreateTaskDto, DoneTaskDto,
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


    async createTask(dto: CreateTaskDto) {
        logger.info("TasksService::createTask")
        // Find status
        const status: IStatus = await this._statusesService.findOne({ name: StatusEnum.PENDING });
        // Create and return task
        const createObj: ITask = {
            title: dto.title,
            description: dto.description,
            statusId: status.id!
        }
        const filter = { title: createObj.title }
        return await this._tasksRepository.create(createObj, filter);
    }


    async getAllTasks(filter: IGetAllRequestFilter) {
        logger.info("TasksService::getAllTasks");
        if (Object.keys(filter).length == 0) {
            return await this._tasksRepository.getAll();
        }
        return await this._tasksRepository.getAll(filter);

    }


    async processTask(id: number) {
        logger.info("TasksService::processTask");

        const status: IStatus = await this._statusesService.findOne({ name: StatusEnum.PROCESSING }); // Find PROCESSING status
        const updateObj: ITaskUpdate = {id, statusId: status.id}; // Update obj

        return await this._tasksRepository.update(updateObj, id);
    }


    async doneTask(id: number, dto: DoneTaskDto) {
        logger.info("TasksService::doneTask");

        const status: IStatus = await this._statusesService.findOne({ name: StatusEnum.DONE }); // Find DONE status
        const updateObj: ITaskUpdate = {id, statusId: status.id, }; // Update obj
        if (dto.comment) updateObj.comment = dto.comment;

        return await this._tasksRepository.update(updateObj, id);
    }


    async abortTask(id: number, dto: AbortTaskDto) {
        logger.info("TasksService::abortTask");

        const status: IStatus = await this._statusesService.findOne({ name: StatusEnum.ABORTED }); // Find DONE status
        const updateObj: ITaskUpdate = {id, statusId: status.id, }; // Update obj
        if (dto.comment) updateObj.comment = dto.comment;

        return await this._tasksRepository.update(updateObj, id);
    }


    async abortAllTasks() {
        logger.info("TasksService::abortAllTasks")
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