import { ApiProperty } from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class RemoveLinkDto {
    @ApiProperty({example: '1', description: 'ID ссылки'})
    @IsNumber({}, {message: 'ID должен быть цифрой'})
    readonly id: number;
}