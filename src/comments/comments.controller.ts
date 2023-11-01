import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comments.service';
import { CreateCommentRequestDto } from 'src/common/types/comment';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';

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
  @UseGuards(AccessTokenGuard)
  async createComment(
    @Req() req: Request,
    @Body() createCommentDto: Omit<CreateCommentRequestDto, 'authorId'>,
  ) {
    try {
      // Process the comment creation logic here
      console.log('createCommentDto', createCommentDto);
      const userId = req.user['id'];
      const createCommentRequest = {
        ...createCommentDto,
        authorId: userId,
      };
      // Then publish a message to RabbitMQ
      await this.commentService.connect();
      await this.commentService.publishMessage(
        'comment_worker',
        'post.comment.create',
        { ...createCommentRequest },
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
