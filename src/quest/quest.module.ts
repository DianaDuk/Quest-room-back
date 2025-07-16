import { Module } from "@nestjs/common";
import { QuestService } from "./quest.service";
import { QuestController } from "./quest.controller";
import { PrismaService } from "src/prisma.service";
import { DataService } from "./quest.data.service";

@Module({
    controllers: [QuestController],
    providers: [QuestService, PrismaService, DataService],
})

export class QuestModel {}