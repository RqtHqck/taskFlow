import {
    IsString,
    IsOptional,
    IsEnum,
    MinLength,
    IsNotEmpty,
    MaxLength, IsNumber, IsDate
} from 'class-validator';
import { StatusEnum } from "@entities/enums";
import {Exclude, Expose} from "class-transformer";


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Title should not be empty' })
    @MaxLength(255, { message: 'Title should not be grater then 255 symbols' })
    title!: string;

    @IsString()
    @IsNotEmpty({ message: 'Description should not be empty' })
    description!: string;
}


export class DoneTaskDto {
    @IsString()
    @IsOptional()
    comment?: string;
}


export class AbortTaskDto {
    @IsString()
    @IsOptional()
    comment?: string;
}


export class TaskDto {
    @Expose()
    @IsNumber()
    id!: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    title!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    description!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    comment!: string;

    @Expose()
    @IsNumber()
    statusId!: string;

    @Exclude()
    @IsNumber()
    status_id!: string;


    @Expose()
    @IsDate()
    createdAt!: Date | string;
}