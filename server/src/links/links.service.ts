import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Links} from "./links.model";
import {CreateRedirectLinkDto} from "./dto/create-redirect-link.dto";
import {RemoveLinkDto} from "./dto/remove-link.dto";

@Injectable()
export class LinksService {
    constructor (@InjectModel(Links) private linkRepository: typeof Links) {}

    async createLink(dto: CreateRedirectLinkDto) {
        const linkData = await this.linkRepository.create(dto)
        return linkData
    }

    async getLinkByName(link: string) {
        const linkData = await this.linkRepository.findOne({where: {link}, include: {all: true}})
        return linkData;
    }

    async getLinkById(id: number) {
        const linkData = await this.linkRepository.findOne({where: {id}, include: {all: true}})
        return linkData;
    }

    async removeLink(id: number) {
        const link = await this.getLinkById(id)

        if (!link) {
            throw new HttpException(`Ссылка с ID: ${id} не найдена`, HttpStatus.NOT_FOUND)
        }

        await this.linkRepository.destroy({
            where: {id}
        })

        return link
    }

    async getRedirectLink(link: string) {
        const linkData = await this.linkRepository.findOne({where: {link}, include: {all: true}})
        return linkData.redirectLink;
    }

    async generateLink(linkDto: CreateRedirectLinkDto) {
        const candidate = await this.getLinkByName(linkDto.link)
        if (candidate) {
            throw new HttpException(`Ссылка ${linkDto.link} уже существует`, HttpStatus.BAD_REQUEST)
        }

        await this.createLink(linkDto)

        return linkDto
    }


    async getAllLinks() {
        const links = await this.linkRepository.findAll({include: {all: true}})
        return links
    }
}
