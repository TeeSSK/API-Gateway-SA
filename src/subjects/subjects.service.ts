import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  SubjectServiceClient,
  GetSubjectByIdRequest,
  SUBJECT_SERVICE_NAME,
  CreateSubjectRequest,
  SUBJECT_PACKAGE_NAME,
} from '../common/types/subject';
import { ClientGrpc } from '@nestjs/microservices';
// import { ReplaySubject } from 'rxjs';

@Injectable()
export class SubjectsService implements OnModuleInit {
  private subjectsService: SubjectServiceClient;

  constructor(@Inject(SUBJECT_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.subjectsService =
      this.client.getService<SubjectServiceClient>(SUBJECT_SERVICE_NAME);
    console.log(
      'this.subjectsService',
      this.subjectsService.getSubjectById({ id: 1 }),
    );
    console.log(__dirname);
  }

  create(createSubjectRequest: CreateSubjectRequest) {
    return this.subjectsService.createSubject(createSubjectRequest);
  }

  findById(getSubjectByIdRequest: GetSubjectByIdRequest) {
    console.log('findbyid service');
    console.log(this.subjectsService);
    return this.subjectsService.getSubjectById(getSubjectByIdRequest);
  }
}
