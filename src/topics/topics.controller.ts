import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TopicService } from './topics.service';
import { CreateTopicRequestDto } from 'src/common/types/topic';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  getAllTopics() {
    return this.topicService.getTopics();
  }

  @Get(':id')
  getTopicById(@Param('id') id: string) {
    return this.topicService.getTopicById(id);
  }

  @Post()
  createTopic(@Body() createTopicDto: CreateTopicRequestDto) {
    return this.topicService.createTopic(createTopicDto);
  }
}
