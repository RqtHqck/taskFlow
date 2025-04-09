import ApiError from "@errors/ApiError";
import logger from "@utils/logger";
import {Service} from "typedi";
import {TasksRepository} from "../repositories/tasks.repository";


@Service()
export class TasksService {
    constructor(public db: TasksRepository) { }

}