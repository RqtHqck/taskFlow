import {StatusesRepository} from "@repositories/statuses.repository";
import { IStatus } from "@entities/interfaces";
import logger from "@utils/logger";
import {CreateStatusDto} from "@entities/dto/CreateStatusDto";

export class StatusesService {
    private _statusesRepository: StatusesRepository;

    constructor() {
        this._statusesRepository = new StatusesRepository();
    }

    async create(createStatusDto: CreateStatusDto) {
        logger.info("StatusesService::create")

        // Create and return task
        const status: IStatus = {
            name: createStatusDto.name
        }
        return await this._statusesRepository.createOne(status);
    }
}