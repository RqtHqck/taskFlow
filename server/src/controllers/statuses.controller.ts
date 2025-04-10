import {NextFunction, Request, Response} from 'express';
import {StatusesService} from "@services/statuses.service";
import logger from "@utils/logger";
import {CreateStatusDto} from "@entities/dto/status.dto";

export class StatusesController {
    private _statusesService: StatusesService;

    constructor(statusesService: StatusesService) {
        this._statusesService = statusesService;
    }

    async createOne(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("StatusesController::createOne")
            const createStatusDto: CreateStatusDto = req.body;
            const status = await this._statusesService.createOne(createStatusDto);
            return res
                .status(200)
                .json({status});
        } catch (error) {
            next(error);
        }
    }
}