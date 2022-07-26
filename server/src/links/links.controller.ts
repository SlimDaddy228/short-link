import {Body, Controller, Get, Param, Post, UsePipes} from '@nestjs/common';
import {LinksService} from "./links.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateRedirectLinkDto} from "./dto/create-redirect-link.dto";
import {ValidationPipe} from "../pipes/validation.pipe";
import {Links} from "./links.model";
import {User} from "../users/users.model";
import {RemoveLinkDto} from "./dto/remove-link.dto";

@ApiTags('Ссылки')
@Controller('/links')
export class LinksController {
    constructor (private linksService: LinksService) {}

    @ApiOperation({summary: 'Создание ссылки'})
    @ApiResponse({status: 200, type: Links})
    @Post()
    createLink(@Body() dto: CreateRedirectLinkDto) {
        return this.linksService.createLink(dto)
    }

    @ApiOperation({summary: 'Удаление ссылки'})
    @ApiResponse({status: 200, type: Links})
    @Post('/:id')
    removeLink(@Param('id') id: number) {
        return this.linksService.removeLink(id)
    }

    @ApiOperation({summary: 'Получение всех созданных ссылок'})
    @ApiResponse({status: 200, type: [Links]})
    @Get()
    getLinks() {
        return this.linksService.getAllLinks()
    }

    @ApiOperation({summary: 'Получение ссылки по её названию'})
    @ApiResponse({status: 200, type: [Links]})
    @Get('/:link')
    getLinkById(@Param('link') link: string) {
        return this.linksService.getLinkByName(link)
    }

    @ApiOperation({summary: 'Получение ссылки на которую переадресовывает'})
    @ApiResponse({status: 200, type: [CreateRedirectLinkDto]})
    @Get('redirect_link/:redirect_link')
    getRedirectLink(@Param('redirect_link') link: string) {
        return this.linksService.getRedirectLink(link)
    }

    @ApiOperation({summary: 'Генерация ссылки'})
    @Post('/generateLink')
    @UsePipes(ValidationPipe)
    generateLink(@Body() linkDto: CreateRedirectLinkDto) {
        return this.linksService.generateLink(linkDto)
    }
}
