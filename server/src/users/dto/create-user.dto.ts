import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'test@mail.ru', description: 'Почтовый адрес пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({example: 'test.password', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: "Не меньше 4 и не больше 16 символов"})
    readonly password: string;

    @ApiProperty({example: 'USER', description: 'Название созданной роли'})
    readonly roleValue?: string;
}