import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { TopicService } from './topics.service';
import { CreateTopicRequestDto } from 'src/common/types/topic';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

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
  @UseGuards(AccessTokenGuard)
  createTopic(
    @Req() req: Request,
    @Body() createTopicDto: Omit<CreateTopicRequestDto, 'creatorId'>,
  ) {
    const userId = req.user['id'];
    const createTopicRequest = {
      ...createTopicDto,
      creatorId: userId,
    };
    return this.topicService.createTopic(createTopicRequest);
  }
}
