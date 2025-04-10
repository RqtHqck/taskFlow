import {Sequelize} from "sequelize-typescript";
import Task from "@models/task.model";
import Status from "@models/status.model";

export interface ITask {
    id?: number;
    title: string;
    description: string;
    comment?: string | null;
    statusId: number;
}

export interface IStatus {
    id?: number;
    name: string;
}