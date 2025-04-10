import { Router } from 'express';
import {StatusesController} from "@controllers/statuses.controller";
import {StatusesService} from "@services/statuses.service";
import {validateBodyDto} from "@middlewares/validators/validateDto.middleware";
import {CreateStatusDto} from "@entities/dto/CreateStatusDto";

const statusesService = new StatusesService();
const statusesController = new StatusesController(statusesService);

const statusesRouter = Router();

// POST api/v1/tasks
// Body {title, description, status}
statusesRouter.post('/',
    validateBodyDto(CreateStatusDto),
    statusesController.create.bind(statusesController));

export default statusesRouter;