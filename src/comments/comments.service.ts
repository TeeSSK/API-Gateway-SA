import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CreateCommentRequestDto } from 'src/common/types/comment';
import * as amqp from 'amqplib';

@Injectable()
export class CommentService {
  constructor(private readonly httpService: HttpService) {}

  private connection: amqp.Connection;
  private channel: amqp.Channel;

  topicUrl = 'http://localhost:4000';

  async connect() {
    console.log('Connecting to RabbitMQ');
    this.connection = await amqp.connect(
      'amqp://guest:guest@localhost:5672/%2F',
    );
    this.channel = await this.connection.createChannel();
    // console.log(this.channel);
  }

  async publishMessage(exchange: string, routingKey: string, message: any) {
    await this.channel.assertExchange(exchange, 'topic', { durable: false });
    await this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
    );
    console.log('Message sent to RabbitMQ');
  }

  async close() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }

  async getComments(topicId: string) {
    const response = this.httpService
      .get(`${this.topicUrl}/comments?topicId=${topicId}`)
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const comments = await lastValueFrom(response);
    console.log(comments);

    return comments;
  }

  async getCommentById(id: string) {
    const response = this.httpService
      .get(`${this.topicUrl}/comments/${id}`)
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const comment = await lastValueFrom(response);
    console.log(comment);

    return comment;
  }

  async createComment(createCommentDto: CreateCommentRequestDto): Promise<any> {
    const response = this.httpService
      .post(`${this.topicUrl}/comments`, {
        ...createCommentDto,
      })
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const comment = await lastValueFrom(response);
    console.log(comment);

    return comment;
  }
}
