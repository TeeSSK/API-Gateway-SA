import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CreateTopicRequestDto } from 'src/common/types/topic';

@Injectable()
export class TopicService {
  constructor(private readonly httpService: HttpService) {}

  topicUrl = process.env.TOPIC_SERVICE_URL;

  async getTopics() {
    const response = this.httpService
      .get(`${this.topicUrl}/topics`)
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const topics = await lastValueFrom(response);
    console.log(topics);

    return topics;
  }

  async getTopicById(id: string) {
    const response = this.httpService
      .get(`${this.topicUrl}/topics/${id}`)
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const topic = await lastValueFrom(response);
    console.log(topic);

    return topic;
  }

  async createTopic(createTopicDto: CreateTopicRequestDto): Promise<any> {
    const response = this.httpService
      .post(`${this.topicUrl}/topics`, {
        ...createTopicDto,
      })
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    const topic = await lastValueFrom(response);
    console.log(topic);

    return topic;
  }
}
