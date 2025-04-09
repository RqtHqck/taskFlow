import {
    IsString,
    IsOptional,
    IsEnum,
    MinLength,
    IsNotEmpty,
    MaxLength,
    Matches
} from 'class-validator';
import { Expose } from 'class-transformer';
import { StatusEnum } from "@entities/enums";


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Title should not be empty' })
    @MinLength(3, { message: 'Имя пользователя должно содержать минимум 3 символа' })
    @MaxLength(64, { message: 'Имя пользователя должно содержать не более 64 символов' })
    @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Имя пользователя может содержать только буквы, цифры и символы: _, ., -' })
    title!: string;

    @IsString()
    @IsNotEmpty({ message: 'Description should not be empty' })
    @MinLength(10, { message: 'Description should not be less then 10 symbols' })
    @MaxLength(1000, { message: 'Description should not be grater then 1000 symbols' })
    @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Description can be letters, numbers and symbols: ,, _, ., -' })
    description!: string;

    @IsString()
    @MinLength(10, { message: 'Comment should not be less then 10 symbols' })
    @MaxLength(2000, { message: 'Comment should not be grater then 2000 symbols' })
    @Matches(/^[a-zA-Zа-яА-Я0-9_.-]+$/, { message: 'Comment can be letters, numbers and symbols: ,, _, ., -' })
    comment?: string;

    @IsOptional()
    @IsEnum(StatusEnum)
    status?: string
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
    status_id!: number;
}