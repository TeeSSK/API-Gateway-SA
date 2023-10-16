import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  SubjectServiceClient,
  GetSubjectByIdRequest,
  SUBJECT_SERVICE_NAME,
  CreateSubjectRequest,
} from '../common/types/subject';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-subject.option';
// import { ReplaySubject } from 'rxjs';

@Injectable()
export class SubjectService implements OnModuleInit {
  @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private subjectService: SubjectServiceClient;

  onModuleInit() {
    this.subjectService =
      this.client.getService<SubjectServiceClient>(SUBJECT_SERVICE_NAME);
  }

  create(createSubjectRequest: CreateSubjectRequest) {
    return this.subjectService.createSubject(createSubjectRequest);
  }

  async findById(getSubjectByIdRequest: GetSubjectByIdRequest) {
    return this.subjectService.getSubjectById(getSubjectByIdRequest);
  }
}
