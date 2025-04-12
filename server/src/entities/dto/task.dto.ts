import {
    IsString,
    IsOptional,
    IsEnum,
    MinLength,
    IsNotEmpty,
    MaxLength, IsNumber,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { StatusEnum } from "@entities/enums";


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Title should not be empty' })
    @MinLength(3, { message: 'Title should not be less then 3 symbols' })
    @MaxLength(100, { message: 'Title should not be grater then 100 symbols' })
    // @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Title can be letters, numbers and symbols: _, ., -' })
    title!: string;

    @IsString()
    @IsNotEmpty({ message: 'Description should not be empty' })
    @MinLength(10, { message: 'Description should not be less then 10 symbols' })
    @MaxLength(1000, { message: 'Description should not be grater then 1000 symbols' })
    // @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Description can be letters, numbers and symbols: ,, _, ., -' })
    description!: string;

    @IsString()
    @IsOptional()
    @MinLength(10, { message: 'Comment should not be less then 10 symbols' })
    @MaxLength(2000, { message: 'Comment should not be grater then 2000 symbols' })
    // @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Comment can be letters, numbers and symbols: ,, _, ., -' })
    comment!: string;

    @IsOptional()
    @IsEnum(StatusEnum)
    status!: StatusEnum
}


export class UpdateTaskDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number

    @IsString()
    @IsNotEmpty({ message: 'Title should not be empty' })
    @MinLength(3, { message: 'Title should not be less then 3 symbols' })
    @MaxLength(100, { message: 'Title should not be grater then 100 symbols' })
        // @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Title can be letters, numbers and symbols: _, ., -' })
    title!: string;

    @IsString()
    @IsNotEmpty({ message: 'Description should not be empty' })
    @MinLength(10, { message: 'Description should not be less then 10 symbols' })
    @MaxLength(1000, { message: 'Description should not be grater then 1000 symbols' })
        // @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Description can be letters, numbers and symbols: ,, _, ., -' })
    description!: string;

    @IsString()
    @MinLength(10, { message: 'Comment should not be less then 10 symbols' })
    @MaxLength(2000, { message: 'Comment should not be grater then 2000 symbols' })
        // @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Comment can be letters, numbers and symbols: ,, _, ., -' })
    comment!: string;


    @IsEnum(StatusEnum)
    status!: StatusEnum
}

export class PatchUpdateTaskDto {
    @IsNotEmpty()
    @IsNumber()
    id!: number

    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Title should not be empty' })
    @MinLength(3, { message: 'Title should not be less then 3 symbols' })
    @MaxLength(100, { message: 'Title should not be grater then 100 symbols' })
        // @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Title can be letters, numbers and symbols: _, ., -' })
    title?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Description should not be empty' })
    @MinLength(10, { message: 'Description should not be less then 10 symbols' })
    @MaxLength(1000, { message: 'Description should not be grater then 1000 symbols' })
        // @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Description can be letters, numbers and symbols: ,, _, ., -' })
    description?: string;

    @IsString()
    @IsOptional()
    @MinLength(10, { message: 'Comment should not be less then 10 symbols' })
    @MaxLength(2000, { message: 'Comment should not be grater then 2000 symbols' })
        // @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Comment can be letters, numbers and symbols: ,, _, ., -' })
    comment?: string;

    @IsOptional()
    @IsEnum(StatusEnum)
    status?: StatusEnum
}


export class PatchUpdateAllTasksStatusDto {
    @IsEnum(StatusEnum)
    @IsNotEmpty()
    status?: StatusEnum
}


export class TaskDto {
    @Expose()
    id!: number;

    @Expose()
    @IsString()
    title!: string;

    @Expose()
    @IsString()
    description!: string;

    @Expose()
    @IsString()
    comment!: string;

    @Expose()
    statusId!: number;
}

