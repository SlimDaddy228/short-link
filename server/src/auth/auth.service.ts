import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "../users/users.model";
import {LinksService} from "../links/links.service";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService, private linksService: LinksService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async isAuth(req: any) {
        const user = await this.userService.getUserByEmail(req.user.email)
        if (!user) {
            throw new HttpException(`Пользователя с ${req.user.email} несуществует`, HttpStatus.BAD_REQUEST)
        }

        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        if (!user) {
            throw new UnauthorizedException({message: "Неверный email"})
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (!passwordEquals) {
            throw new UnauthorizedException({message: "Неверный пароль"})
        }

        return user;
    }

}
