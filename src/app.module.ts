import { Module } from '@nestjs/common';
import { QuestModel } from './quest/quest.module';

@Module({
  imports: [QuestModel],
})
export class AppModule {}
