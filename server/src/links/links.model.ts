import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface LinksCreationAttrs {
    id: number,
    link: string,
    redirectLink: string
}

@Table({tableName: 'links'})
export class Links extends Model<Links, LinksCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'docs', description: 'Название сокращенной ссылки'})
    @Column({type: DataType.STRING})
    link: string;

    @ApiProperty({example: 'www.google.com', description: 'Адрес ссылки на которую будет переадресовывать'})
    @Column({type: DataType.STRING})
    redirectLink: string;
}