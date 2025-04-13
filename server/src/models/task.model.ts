import {
    DataType,
    Model,
    Table,
    Column,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    Default, NotNull, ForeignKey, BelongsTo, Unique, CreatedAt
} from 'sequelize-typescript';

import StatusModel from "@models/status.model";
import {InferAttributes, InferCreationAttributes} from "sequelize";


@Table({
    timestamps: false,
    paranoid: false,
    tableName: 'tasks',
    modelName: 'task',
    charset: 'utf8',
    collate: 'utf8_general_ci'
})
class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.STRING(255),
        validate: {
            notEmpty: true,
            max: 255
        }
    })
    declare title: string;


    @AllowNull(false)
    @Column({
        type: DataType.TEXT,
        validate: {
            notEmpty: true,
        }
    })
    declare description: string;

    @AllowNull(true)
    @Default(null)
    @Column({
        type: DataType.TEXT,
    })
    declare comment?: string;

    @AllowNull(false)
    @NotNull
    @ForeignKey(() => StatusModel) 
    @Column({
        type: DataType.INTEGER,
        field: 'status_id'
    })
    declare statusId: number;

    @BelongsTo(() => StatusModel, {
        foreignKey: 'status_id',
        targetKey: 'id'
    })
    declare status: StatusModel;

    @CreatedAt
    @Default(DataType.NOW)
    @Column({
        type: DataType.DATEONLY,
        field: 'created_at',
        validate: {
            notEmpty: true,
            isDate: true,
        },
    })
    declare createdAt: Date
}

export default Task;