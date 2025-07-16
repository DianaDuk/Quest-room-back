// src/data.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Quest, Prisma } from '@prisma/client';

@Injectable()
export class DataService {
  constructor(private prisma: PrismaService) {}

  async createQuest(data: Prisma.QuestCreateInput): Promise<Quest> {
    return this.prisma.quest.create({ data });
  }

  async getAllQuests(): Promise<Quest[]> {
    return this.prisma.quest.findMany();
  }

  async getQuestById(id: number): Promise<Quest | null> {
    return this.prisma.quest.findUnique({
      where: { id },
    });
  }

  async updateQuest(
    id: number,
    data: Prisma.QuestUpdateInput,
  ): Promise<Quest> {
    return this.prisma.quest.update({
      where: { id },
      data,
    });
  }

  async deleteQuest(id: number): Promise<void> {
    await this.prisma.quest.delete({
      where: { id },
    });
  }
}
