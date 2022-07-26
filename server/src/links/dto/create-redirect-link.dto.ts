import {IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRedirectLinkDto {
    @IsString({message: "Должно быть строкой"})
    @MinLength(1, {message: 'Не меньше 1 символа'})
    @ApiProperty({example: 'www.google.com', description: 'Адрес ссылки на которую будет переадресовывать'})
    readonly redirectLink: string;

    @IsString({message: "Должно быть строкой"})
    @MinLength(1, {message: 'Не меньше 1 символа'})
    @ApiProperty({example: 'docs', description: 'Название сокращенной ссылки'})
    readonly link: string;
}