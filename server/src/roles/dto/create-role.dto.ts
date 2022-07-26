import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'admin', description: 'Уникательное значение роли'})
    readonly value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    readonly description: string;
}