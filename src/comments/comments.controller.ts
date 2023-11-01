import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentRequestDto } from 'src/common/types/comment';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getComments(@Query() query: { topicId: string }) {
    const topicId = query.topicId ?? '';
    console.log(topicId);
    return this.commentService.getComments(topicId);
  }

  @Get(':id')
  getCommentById(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentRequestDto) {
    try {
      // Process the comment creation logic here
      console.log('createCommentDto', createCommentDto);
      // Then publish a message to RabbitMQ
      await this.commentService.connect();
      await this.commentService.publishMessage(
        'comment_worker',
        'post.comment.create',
        { ...createCommentDto },
      );
      const comment = this.commentService;
      setTimeout(async function () {
        await comment.close();
      }, 500);

      return {
        success: true,
        message: 'Comment created and message sent to RabbitMQ',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create comment and send message to RabbitMQ',
        error,
      };
    }
  }
}
