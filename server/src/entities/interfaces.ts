import {StatusEnum} from "@entities/enums";

export interface ITask {
    id?: number;
    title: string;
    description: string;
    comment?: string | null;
    statusId: number;
}

export interface IStatus {
    id?: number;
    name: StatusEnum;
}