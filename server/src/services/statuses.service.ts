import {StatusesRepository} from "@repositories/statuses.repository";
import { IStatus } from "@entities/interfaces";
import logger from "@utils/logger";
import {CreateStatusDto} from "@entities/dto/status.dto";
import {StatusEnum} from "@entities/enums";

export class StatusesService {
    private _statusesRepository: StatusesRepository;

    constructor() {
        this._statusesRepository = new StatusesRepository();
    }

    async findOne(filter: any) {
        logger.info("StatusesService::find")
        // Find by filter
        return await this._statusesRepository.findOne(filter);
    }


    async createMany() {
        logger.info("StatusesService::createMany")
        const allowedStatusNames = [...Object.values(StatusEnum)]
        console.log(allowedStatusNames)
        // Create and return statuses
        let statuses: IStatus[] = allowedStatusNames.map((name: StatusEnum): IStatus => ({ name }));
        console.log(statuses)

        await this._statusesRepository.createMany(statuses);
    }
}