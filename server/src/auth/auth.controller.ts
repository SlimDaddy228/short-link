import {Body, Controller, Get, Post, Request, UseGuards, UsePipes} from "@nestjs/common";
import {ApiOperation, ApiProperty, ApiTags} from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "./jwt-auth.guard";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Авторизация'})
    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Регистрация'})
    @Post('/registration')
    @UsePipes(ValidationPipe)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @ApiOperation({summary: 'Проверка авторизации пользователя'})
    @UseGuards(JwtAuthGuard)
    @Get()
    isAuth(@Request() req) {
        return this.authService.isAuth(req);
    }
}
