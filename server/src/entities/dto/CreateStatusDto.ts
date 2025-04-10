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


export class CreateStatusDto {
    @IsString()
    @IsNotEmpty({ message: 'Name should not be empty' })
    @MinLength(3, { message: 'Name should not be less then 3 symbols' })
    @MaxLength(32, { message: 'Name should not be grater then 32 symbols' })
    name!: string;
}

export class StatusDto {
    @Expose()
    id!: number;

    @Expose()
    @IsString()
    name!: string;
}