import {
    IsString,
    IsOptional,
    IsEnum,
    MinLength,
    IsNotEmpty,
    MaxLength
} from 'class-validator';
import { StatusEnum } from "@entities/enums";


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Title should not be empty' })
    @MinLength(3, { message: 'Title should not be less then 3 symbols' })
    @MaxLength(100, { message: 'Title should not be grater then 100 symbols' })
    title!: string;

    @IsString()
    @IsNotEmpty({ message: 'Description should not be empty' })
    @MinLength(10, { message: 'Description should not be less then 10 symbols' })
    @MaxLength(1000, { message: 'Description should not be grater then 1000 symbols' })
    description!: string;
}


export class PatchUpdateTaskFixedDto {
    @IsString()
    @IsOptional()
    @MinLength(10, { message: 'Comment should not be less then 10 symbols' })
    @MaxLength(2000, { message: 'Comment should not be grater then 2000 symbols' })
    comment?: string;

    @IsEnum(StatusEnum)
    status!: StatusEnum
}
