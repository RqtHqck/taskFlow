import {Sequelize} from "sequelize-typescript";
import Task from "@models/task.model";
import Status from "@models/status.model";

export default interface ITask {
    id?: number;
    title: string;
    description: string;
    comment?: string | null;
    status_id: number;
}