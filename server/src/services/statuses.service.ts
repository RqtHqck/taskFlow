import {StatusesRepository} from "@repositories/statuses.repository";
import { IStatus } from "@entities/interfaces";
import logger from "@utils/logger";
import {CreateStatusDto} from "@entities/dto/CreateStatusDto";

export class StatusesService {
    private _statusesRepository: StatusesRepository;

    constructor() {
        this._statusesRepository = new StatusesRepository();
    }

    async createOne(createStatusDto: CreateStatusDto) {
        logger.info("StatusesService::createOne")

        // Create and return task
        const status: IStatus = {
            name: createStatusDto.name
        }
        return await this._statusesRepository.createOne(status);
    }


    async createMany(createStatusesDto: CreateStatusDto[]) {
        logger.info("StatusesService::createMany")

        // Create and return task
        const statuses: IStatus[] = createStatusesDto.map(statusDto => ({ name: statusDto.name}) );
        return await this._statusesRepository.createMany(statuses);
    }
}