import { Router } from 'express';
import {StatusesController} from "@controllers/statuses.controller";
import {StatusesService} from "@services/statuses.service";
import {validateBodyDto} from "@middlewares/validators/validateDto.middleware";
import {CreateStatusDto} from "@entities/dto/CreateStatusDto";

const statusesService = new StatusesService();
const statusesController = new StatusesController(statusesService);

const statusesRouter = Router();

// POST api/v1/statuses
// Body {name}
statusesRouter.post('/',
    validateBodyDto(CreateStatusDto),
    statusesController.createOne.bind(statusesController));

export default statusesRouter;