import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AllowNull, AutoIncrement,
    Unique, HasMany
} from 'sequelize-typescript';

import Task from '@models/task.model';
import {Optional} from "sequelize";
import {StatusEnum} from "@entities/enums";


interface StatusAttributes {
    id: number;
    name: string;
};

interface StatusCreationAttributes extends Optional<StatusAttributes, 'id'> {}


@Table({
    timestamps: false,
    paranoid: false,
    tableName: 'statuses',
    modelName: 'Status',
})
class Status extends Model<StatusAttributes, StatusCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(StatusEnum)),
    })
    declare name: StatusEnum;

    @HasMany(() => Task, {
        foreignKey: 'status_id'
    })
    declare tasks: Task[];
}

export default Status;