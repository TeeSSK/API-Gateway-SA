export interface CreateCommentRequestDto {
  correlationId: string;
  authorId: string;
  topicId: string;
  description: string;
}
