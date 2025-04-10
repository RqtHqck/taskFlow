import {
    IsString,
    MinLength,
    IsNotEmpty,
    MaxLength, IsEnum,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { StatusEnum } from "@entities/enums";


export class CreateStatusDto {
    @IsString()
    @IsNotEmpty({ message: 'Name should not be empty' })
    @MinLength(3, { message: 'Name should not be less then 3 symbols' })
    @MaxLength(32, { message: 'Name should not be grater then 32 symbols' })
    @IsEnum(StatusEnum)
    name!: StatusEnum;
}

export class StatusDto {
    @Expose()
    id!: number;

    @Expose()
    @IsString()
    @IsEnum(StatusEnum)
    name!: StatusEnum;
}