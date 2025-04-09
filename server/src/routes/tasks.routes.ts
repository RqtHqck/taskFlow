import { Router } from 'express';
import {TasksController} from "@controllers/tasks.controller";
import {TasksService} from "@services/tasks.service";
import {validateBodyDto} from "@middlewares/validators/validateDto.middleware";
import {CreateTaskDto} from "@entities/dto/CreateTaskDto";

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
//
// // GET api/v1/tasks/:taskId
// // Params taskId
// tasksRouter.get('/:taskId',
//     tasksController.getById.bind(tasksController));
//
// // GET api/v1/tasks/:taskId/status
// // Params taskId
// tasksRouter.get('/:taskId',
//     tasksController.getTaskStatus.bind(tasksController));
//
// // PUT api/v1/tasks/:taskId
// // Params taskId
// // Body {title, description, comment, status}
// tasksRouter.put('/:taskId',
//     tasksController.updateById.bind(tasksController));
//
// // PATCH api/v1/tasks/:taskId/status
// // Params taskId
// // Body {status, comment}
// tasksRouter.patch('/:taskId',
//     tasksController.updateTaskStatusWithResponse.bind(tasksController));
//
// // PATCH api/v1/tasks/status
// // Body {status}
// tasksRouter.patch('/:taskId',
//     tasksController.updateManyStatusesToPending.bind(tasksController));
//
// // PATCH api/v1/tasks/status
// // Params taskId
// tasksRouter.delete('/:taskId',
//     tasksController.deleteById.bind(tasksController));

export default tasksRouter;