import {NextFunction, Request, Response} from 'express';
import {StatusesService} from "@services/statuses.service";
import logger from "@utils/logger";
import {CreateStatusDto} from "@entities/dto/CreateStatusDto";

export class StatusesController {
    private _statusesService: StatusesService;

    constructor(statusesService: StatusesService) {
        this._statusesService = statusesService;
    }

    async createOne(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("StatusesController::createOne")
            const statusDto: CreateStatusDto = req.body;
            const status = await this._statusesService.createOne(statusDto);
            return res
                .status(200)
                .json({status});
        } catch (error) {
            next(error);
        }
    }


    async createMany(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            logger.info("StatusesController::createMany")
            const statusesDto: CreateStatusDto[] = req.body;
            const statuses = await this._statusesService.createMany(statusesDto);
            return res
                .status(200)
                .json({statuses});
        } catch (error) {
            next(error);
        }
    }
}