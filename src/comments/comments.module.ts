import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommentsController } from './comments.controller';
import { CommentService } from './comments.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [CommentsController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
