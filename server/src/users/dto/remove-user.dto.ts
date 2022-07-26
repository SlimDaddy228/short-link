import { ApiProperty } from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class RemoveUserDto {
    @ApiProperty({example: '1', description: 'ID пользователя'})
    @IsNumber({}, {message: 'ID должен быть цифрой'})
    readonly id: number;
}