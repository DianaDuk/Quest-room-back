
import { Injectable } from '@nestjs/common';
import { Quest, Prisma } from '@prisma/client';
import { DataService } from './quest.data.service';

@Injectable()
export class QuestService {
  constructor(private dataService: DataService) {}

   async createQuest(data: Prisma.QuestCreateInput): Promise<Quest> {
    return this.dataService.createQuest(data);
  }

  async getAllQuests(): Promise<Quest[]> {
    return this.dataService.getAllQuests();
  }

  async getQuestById(id: number): Promise<Quest | null> {
    return this.dataService.getQuestById(id);
  }

  async updateQuest(
    id: number, 
    data: Prisma.QuestUpdateInput,
  ): Promise<Quest> {
    return this.dataService.updateQuest(id, data);
  }

  async deleteQuest(id: number): Promise<{ message: string }> {
  await this.dataService.deleteQuest(id);
  return { message: `Квест успешно удалён` };
}
}

