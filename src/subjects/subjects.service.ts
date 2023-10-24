import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import {
  SubjectServiceClient,
  GetSubjectByIdRequest,
  SUBJECT_SERVICE_NAME,
  CreateSubjectRequest,
  PaginateSubjectRequest,
} from '../common/types/subject';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-subject.option';
import { map, take } from 'rxjs';

@Injectable()
export class SubjectService implements OnModuleInit {
  @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private subjectService: SubjectServiceClient;

  onModuleInit() {
    this.subjectService =
      this.client.getService<SubjectServiceClient>(SUBJECT_SERVICE_NAME);
  }

  create(createSubjectRequest: CreateSubjectRequest, isAdmin: boolean) {
    if (!isAdmin) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.subjectService.createSubject(createSubjectRequest).pipe(
      map((response) => {
        return {
          subject: {
            ...response.subject,
            id: (response.subject.id as any).low,
            semester: (response.subject.semester as any).low,
            year: (response.subject.year as any).low,
          },
        };
      }),

      take(1),
    );
  }

  findById(getSubjectByIdRequest: GetSubjectByIdRequest) {
    const subject = this.subjectService.getSubjectById(getSubjectByIdRequest);
    if (!subject) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    return subject.pipe(
      map((response) => {
        return {
          subject: {
            ...response.subject,
            id: (response.subject.id as any).low,
            semester: (response.subject.semester as any).low,
            year: (response.subject.year as any).low,
          },
        };
      }),

      take(1),
    );
  }

  paginateSubjects(paginateSubjectRequest: PaginateSubjectRequest) {
    console.log('paginateSubjects');
    console.log(paginateSubjectRequest);
    const subjects = this.subjectService.paginateSubjects(
      paginateSubjectRequest,
    );
    if (!subjects) {
      return {
        subjects: [],
        pageNumber: 0,
        perPage: 0,
        pageCount: 0,
        totalCount: 0,
      };
    }
    return subjects.pipe(
      map((response) => {
        const subjects = response.subjects.map((subject) => ({
          ...subject,
          id: (subject.id as any).low,
          semester: (subject.semester as any).low,
          year: (subject.year as any).low,
        }));
        return {
          ...response,
          pageNumber: (response.pageNumber as any).low,
          perPage: (response.perPage as any).low,
          pageCount: (response.pageCount as any).low,
          totalCount: (response.totalCount as any).low,
          subjects,
        };
      }),

      take(1),
    );
  }
}
