import { Router } from 'express';
import {TasksController} from "@controllers/tasks.controller";
import {TasksService} from "@services/tasks.service";
import {validateBodyDto} from "@middlewares/validators/validateDto.middleware";
import {
    CreateTaskDto,
    PatchUpdateTaskFixedDto,
} from "@entities/dto/task.dto";

const tasksService = new TasksService();
const tasksController = new TasksController(tasksService);

const tasksRouter = Router();

// POST api/v1/tasks/
// Body {title, description}
tasksRouter.post('/',
    validateBodyDto(CreateTaskDto),
    tasksController.create.bind(tasksController));

// // GET api/v1/tasks
// // Query Params date=date&fromDate=fromDate&toDate=toDate&status=status
// tasksRouter.get('/',
//     tasksController.getAll.bind(tasksController));

// PATCH api/v1/tasks/:id
// Body {status, comment?}
tasksRouter.patch('/:id',
    validateBodyDto(PatchUpdateTaskFixedDto),
    tasksController.patchUpdateFixed.bind(tasksController));

// PATCH api/v1/tasks/abortAll
tasksRouter.patch('/abortAll',
    tasksController.abortAll.bind(tasksController));

export default tasksRouter;