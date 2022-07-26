import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Links} from "./links.model";

@Module({
  controllers: [LinksController],
  providers: [LinksService],
  imports: [
    SequelizeModule.forFeature([Links]),
  ],
  exports: [
      LinksService
  ]
})
export class LinksModule {}
