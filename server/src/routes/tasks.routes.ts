import { Router } from 'express';
import {TasksController} from "@controllers/tasks.controller";
import {TasksService} from "@services/tasks.service";
import {
    AbortTaskDto,
    CreateTaskDto,
    DoneTaskDto
} from "@entities/dto/task.dto";
import {validateRequestQueryParams} from "@middlewares/validators/validateRequestQueryParams.middleware";
import {validateBodyDto} from "@middlewares/validators/validateDto.middleware";
import {validateId} from "@middlewares/validators/validateId.middleware";

const tasksService = new TasksService();
const tasksController = new TasksController(tasksService);

const tasksRouter = Router();

// POST api/v1/tasks/
// Body {title, description}
tasksRouter.post('/',
    validateBodyDto(CreateTaskDto),
    tasksController.createTask.bind(tasksController));

// GET api/v1/tasks
// Query Params date=date&fromDate=fromDate&toDate=toDate&status=status
tasksRouter.get('/',
    validateRequestQueryParams(),
    tasksController.getAllTasks.bind(tasksController));

// PATCH api/v1/tasks/abortAll
tasksRouter.patch('/abortAll',
    tasksController.abortAllTask.bind(tasksController));

// PATCH api/v1/tasks/in-process/:id
tasksRouter.patch('/process/:id',
    validateId(),
    tasksController.processTask.bind(tasksController));

// PATCH api/v1/tasks/in-process/:id
tasksRouter.patch('/done/:id',
    validateId(),
    validateBodyDto(DoneTaskDto),
    tasksController.doneTask.bind(tasksController));

// PATCH api/v1/tasks/:id
// Body {status, comment?}
tasksRouter.patch('/abort/:id',
    validateId(),
    validateBodyDto(AbortTaskDto),
    tasksController.abortTask.bind(tasksController));

export default tasksRouter;