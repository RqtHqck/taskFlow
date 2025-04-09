import {
    DataType,
    Model,
    Table,
    Column,
    PrimaryKey,
    AllowNull,
    AutoIncrement,
    Default, NotNull, ForeignKey, BelongsTo
} from 'sequelize-typescript';

import StatusModel from "@models/status.model";
import {Optional} from "sequelize";


interface TaskAttributes {
    id: number;
    title: string;
    description: string;
    comment: string;
    status_id: number;
};

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}


@Table({
    timestamps: true,
    paranoid: false,
    tableName: 'tasks',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'task',

})
class Task extends Model<TaskAttributes, TaskCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(256),
    })
    declare title: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT,
    })
    declare description: string;

    @AllowNull(true)
    @Default('')
    @Column({
        type: DataType.TEXT,
    })
    declare comment?: string;

    @AllowNull(false)
    @NotNull
    @ForeignKey(() => StatusModel) // Указываем, что это внешний ключ
    @Column({
        type: DataType.INTEGER,
        field: 'status_id'
    })
    declare statusId: number;

    @BelongsTo(() => StatusModel, {
        foreignKey: 'status_id', // в таблице tasks
        targetKey: 'id'         // в таблице statuses
    })
    declare status: StatusModel;
}

export default Task;