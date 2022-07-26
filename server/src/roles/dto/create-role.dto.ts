import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateRoleDto {
    @IsString({message: "Должно быть строкой"})
    @ApiProperty({example: 'admin', description: 'Уникательное значение роли'})
    readonly value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @IsString({message: "Должно быть строкой"})
    readonly description: string;
}