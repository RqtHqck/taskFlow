import {NextFunction, Request, Response} from 'express';
import {StatusesService} from "@services/statuses.service";
import logger from "@utils/logger";
import {CreateStatusDto} from "@entities/dto/CreateStatusDto";

export class StatusesController {
    private _statusesService: StatusesService;

    constructor(statusesService: StatusesService) {
        this._statusesService = statusesService;
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("StatusesController::create")
            const statusDto: CreateStatusDto = req.body;
            const status = await this._statusesService.create(statusDto);
            return res
                .status(200)
                .json({status});
        } catch (error) {
            next(error);
        }
    }

}