import { Router } from 'express';
import {TasksController} from "@controllers/tasks.controller";
import {TasksService} from "@services/tasks.service";
import {validateBodyDto} from "@middlewares/validators/validateDto.middleware";
import {
    CreateTaskDto,
    UpdateTaskDto,
    PatchUpdateTaskDto,
    PatchUpdateAllTasksStatusDto
} from "@entities/dto/task.dto";

const tasksService = new TasksService();
const tasksController = new TasksController(tasksService);

const tasksRouter = Router();

// POST api/v1/tasks
// Body {title, description, status}
tasksRouter.post('/',
    validateBodyDto(CreateTaskDto),
    tasksController.create.bind(tasksController));
//
// // GET api/v1/tasks
// // Query Params date=date&fromDate=fromDate&toDate=toDate&status=status
// tasksRouter.get('/',
//     tasksController.getAll.bind(tasksController));

// GET api/v1/tasks/:taskId
// Params taskId
tasksRouter.get('/:taskId',
    tasksController.getById.bind(tasksController));

// PUT api/v1/tasks/
// Body {title, description, comment, status}
tasksRouter.put('/',
    validateBodyDto(UpdateTaskDto),
    tasksController.update.bind(tasksController));

// PATCH api/v1/tasks/
// Body {status, comment}
tasksRouter.patch('/',
    validateBodyDto(PatchUpdateTaskDto),
    tasksController.patchUpdate.bind(tasksController));

// PATCH api/v1/tasks/status
// Body {status}
tasksRouter.patch('/abortAll',
    tasksController.bulkAbortAll.bind(tasksController));

// // PATCH api/v1/tasks/status
// // Params taskId
// tasksRouter.delete('/:taskId',
//     tasksController.deleteById.bind(tasksController) );

export default tasksRouter;