import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import {RemoveUserDto} from "./dto/remove-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {

    }

    async createUser(dto: CreateUserDto) {
        const role = await this.roleService.getRoleByValue('USER')
        const user = await this.userRepository.create(dto);
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async removeUser(dto: RemoveUserDto) {
        const {id} = dto
        const user = await this.getUserById(id)

        if (!user) {
            throw new HttpException(`Пользователь с ID: ${id} не найден`, HttpStatus.NOT_FOUND)
        }

        await this.userRepository.destroy({
            where: {id}
        })

        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException(`Пользователь с ID: ${dto.userId} не найден`, HttpStatus.NOT_FOUND)
        }

        const role = await this.roleService.getRoleByValue(dto.value);
        if (!role) {
            throw new HttpException(`Роль: ${dto.value} не найдена`, HttpStatus.NOT_FOUND)
        }

        await user.$add('roles', role.id)
        return dto
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException(`Пользователь с ID: ${dto.userId} не найден`, HttpStatus.NOT_FOUND)
        }

        user.banned = true;
        user.banReason = dto.banReason;
        await user.save()

        return user
    }
}
