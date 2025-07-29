import { Module } from '@nestjs/common';
import { QuestModel } from './quest/quest.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [QuestModel, AuthModule],
})
export class AppModule {}
