export interface Forum {
  id: string;
  subjectId: string;
  year: number;
  semester: number;
  section: number;
}

interface TopicMeta {
  timestamp: number;
  date: Date;
}

interface Topic {
  id: string;
  description: string;
  topicCreator: string;
  forumId: string;
  createAt: Date;
  _id: TopicMeta;
}

export interface CreateTopicResponseDto {
  topic: Topic;
  success: boolean;
}

export interface CreateTopicRequestDto {
  description: string;
  year: number;
  section: number;
  creatorId: string;
  semester: number;
  subjectId: string;
}

export interface GetTopicResponseDto {
  id: string;
  form: Forum;
  topicCreatorId: string;
  description: string;
  createdAt: Date;
  comment: string;
}

export interface GetTopicsResponseDto {
  topics: Topic[];
  success: boolean;
}
