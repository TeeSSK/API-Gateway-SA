import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TopicsController } from './topics.controller';
import { TopicService } from './topics.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [TopicsController],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
